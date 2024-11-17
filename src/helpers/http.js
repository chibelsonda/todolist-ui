import http from '@/helpers/axios'
import { useProgressStore as progressStore } from '@/stores/ProgressStore'
import { useAlertStore as alertStore } from '@/stores/AlertStore'
import router from '@/router'

function sendFailResponse() {
    return {
        data: { success: false }
    }
}

/**
 * Send http request
 * @param {string} method
 * @param {string} url
 * @param {array} data
 * @param {boolean} showProgress
 * @param {array} headers
 * @returns {object}
 */
export async function sendRequest(method, url, data, isMultiForm = false, showProgress = true) {
    if (showProgress) {
        progressStore().isInProgress = true
    }

    let response = await http({
        method: method,
        url: url,
        data: data,
        isMultiForm: isMultiForm
    })
        .then((response) => {
            if (!response.data.success) { 
                if (Array.isArray(response.data.message)) {
                    let error = 'The following errors were found: <br /><br />'
                    error += response.data.message.join('<br />')
                    alertStore().error(error)
                } else {
                    alertStore().error(response.data.message)
                }

                return sendFailResponse()
            }

            if (response.data.message){
                alertStore().success(response.data.message)
            }

            return response.data
        })
        .catch((error) => {
            const message = error.response?.data?.message

            if (message){
                alertStore().error(message)
            } else {
                alertStore().error(error.message)
            }

            if (error.response.status == 401){
                router.push('/login')
            }
            
            return sendFailResponse()
        })
        .finally(() => {
            progressStore().isInProgress = false
        })

    return response
}
