import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: { show: false },
        duration: 15000,
    }),
    actions: {
        success(message) {
            this.show('success', message)
        },

        error(message) {
            this.show('error', message)
        },

        info(message) {
            this.show('info', message)
        },

        warning(message) {
            this.show('warning', message)
        },

        show(type, message) {
            let icon = this.getIcon(type)
            
            this.alert = {
                message,
                type: type,
                icon: icon,
                show: true
            };

            setTimeout(() => {
                this.alert.show = false
            }, this.duration) 
        },

        getIcon(type){
            let icon

            switch (type) {
                case 'success':
                    icon = 'mdi-check-circle'
                    break;
                case 'error':
                    icon = 'mdi-close-circle'
                    break;
                case 'info':
                    icon = 'mdi-information'
                    break;
                case 'warning':
                    icon = 'mdi-alert-circle'
                    break;
                default:
            }

            return icon
        },

        clear() {
            this.alert = { show: false };
        }
    }
});