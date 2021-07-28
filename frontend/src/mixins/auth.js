import Cookies from 'js-cookie'
import { HTTP } from '../http-constants'
import router from '../router/index'

export function userIsLogged() {
    return !!Cookies.get('groupomania_token');
}

export function loginCall(user) {
    return HTTP.post('/auth/login', {
        email: user.email,
        password: user.password,
    })
}

export function signupCall(user) {
    return HTTP.post('/auth/signup', {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        job: user.job,
    })
}

export function signoutCall() {
    Cookies.remove('groupomania_token');
    router.push('/login');
}

export function deleteUser(userID) {
    return HTTP.delete(`/auth/delete/${userID}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
        }
    })
}