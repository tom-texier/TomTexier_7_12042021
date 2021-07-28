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

export const updateSharedPost = (post, postID) => {
    return HTTP.put(`/post/updateShared/${postID}`, post, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then(response => {
            return response ? response.data : null
        })
}

export const deletePost = (postID) => {
    return HTTP.delete(`/post/delete/${postID}`, {
            headers: {
                'Content-Type': 'application/json',
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

export const likePost = (postID) => {
    return HTTP.get(`/post/like/${postID}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then((response) => {
            return response ? response.data : null
        })
}

export const dislikePost = (postID) => {
    return HTTP.delete(`/post/dislike/${postID}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then((response) => {
            return response ? response.data : null
        })
}

export const getAllPostsByUserId = (userID) => {
    return HTTP.get(`/post/all/${userID}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then((response) => {
            return response ? response.data : null;
        })
}

export function sharePost(post) {
    return HTTP.post(`/post/share`, post, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
            }
        })
        .then((response) => {
            return response ? response.data : null;
        })
}