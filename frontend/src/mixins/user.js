import { HTTP } from '../http-constants'
import Cookies from 'js-cookie'

export function getCurrentUser() {
    try {
        const promise = HTTP.get('/user/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        });
        const promiseData = promise.then((response) => response.data);
        return promiseData;
    } catch (error) {
        console.log(error);
    }
}