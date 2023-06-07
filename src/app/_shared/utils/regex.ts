export const REGEX = {
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[`~!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/,
    friendlyId: /^[a-zA-Z0-9_]{4,}$/
};
