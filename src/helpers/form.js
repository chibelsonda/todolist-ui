import * as AllRules from '@/helpers/validation'

/**
 * Validate form
 *
 * @var object
 * 
 * @return bool
 */
const validateForm = async (form) => {
    const { valid, error } = await form.value?.validate()
    return valid
}

/**
 * Validate rules
 *
 * @var array
 * 
 * @return array
 */
const validateRules = (rules) => {
    return rules.map(r => {
        let rule = r.split(":");
        if(rule.length == 1){
            return AllRules[r]
        } else {
            return AllRules[rule[0]](...rule.slice(1));
        }
    })
}

export {
    validateForm,
    validateRules
}