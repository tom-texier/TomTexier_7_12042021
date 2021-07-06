import Cookies from 'js-cookie'
import { HTTP } from '../http-constants'
import router from '../router/index'

export function userIsLogged() {
    return !!Cookies.get('groupomania_token');
}

export function loginCall(user) {
    HTTP.post('/auth/login', {
            email: user.email,
            password: user.password,
        })
        .then(user => {
            Cookies.set('groupomania_token', user.data.token, { expires: 1 });
            router.push('/');
        })
        .catch(error => {
            console.log(error);
        })
}

export function signupCall(user) {
    HTTP.post('/auth/signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            job: user.job,
        })
        .then(response => {
            console.log(response);
            loginCall(user);
        })
        .catch(error => {
            console.log(error);
        })
}

export function signoutCall() {
    Cookies.remove('groupomania_token');
    router.push('/login');
}