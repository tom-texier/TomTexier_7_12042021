import { HTTP } from '../http-constants'
import Cookies from 'js-cookie'

export const getCurrentUser = () => {
    return HTTP.get('/user/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then(response => {
            return response ? response.data : null
        })
}