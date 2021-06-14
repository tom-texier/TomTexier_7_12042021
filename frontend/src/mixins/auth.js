import Cookies from 'js-cookie'

export function userIsLogged() {
    return !!Cookies.get('groupomania_token');
}