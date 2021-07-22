import { HTTP } from '../http-constants'
import Cookies from 'js-cookie'

export function createPost(post) {
    try {
        const promise = HTTP.post('/post/create', post, {
            headers: {
                'Content-Type': post.file ? 'multipart/form-data' : 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        });
        const promiseData = promise.then((response) => response.data);
        return promiseData;
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (post, postID) => {
    console.log(post);
    return HTTP.put(`/post/update/${postID}`, post, {
            headers: {
                'Content-Type': post.file ? 'multipart/form-data' : 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then(response => {
            return response ? response.data : null
        })
}

export const getAllPosts = () => {
    return HTTP.get('/post/all', {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then(response => {
            return response ? response.data : null
        })
}