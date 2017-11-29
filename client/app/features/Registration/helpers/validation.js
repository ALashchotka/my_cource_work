import { EMAIL_REGEXP, NAME_REGEXP, MOBILE_REGEXP } from '../../../helpers';

export const emailValidation = (email) => {
    return EMAIL_REGEXP.test(email);
}

export const mobileValidation = (mobile) => {
    return MOBILE_REGEXP.test(mobile);
}

export const userNameValidation = (userName) => {
    return NAME_REGEXP.test(userName);
}

export const passwordValidation = (password) => {
    return password.length > 6;
}
