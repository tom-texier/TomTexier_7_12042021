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

export const updateUser = (user, userID) => {
    return HTTP.put(`/user/update/${userID}`, user, {
            headers: {
                'Content-Type': user.avatar_url ? 'multipart/form-data' : 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then(response => {
            return response ? response.data : null
        })
}

export const getOneUser = (userID) => {
    return HTTP.get(`/user/${userID}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then(response => {
            return response ? response.data : null
        })
}