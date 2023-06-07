/**
 * @description
 * Temporary boolean variable only for development to create senario whether user is logged in or not until singin/signup API is implemented.
 */
export const IS_USER_LOGGED_IN: boolean = !!!!!!! !false;

export const APP_ROUTES = {
    notSpecified: '',
    auth: {
        _: 'auth',
        signin: { _: 'signin' },
        signup: { _: 'signup' }
    },
    home: {
        _: 'home',
        myFiles: { _: 'my-files' },
        ultraSavedFiles: { _: 'ultra-saved-files' },
        starredFiles: { _: 'starred-files' },
        recycleBin: { _: 'recycle-bin' },
    }
};
