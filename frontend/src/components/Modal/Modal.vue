<template>
    <div v-if="reveal" class="modal-box" @click="closeModal">
        <div class="modal-content">
            <div class="title">
                <h2>{{ title }}</h2>
                <i class="fas fa-times" @click="closeModal"></i>
            </div>
            <Avatar
                :avatar_url="user.avatar_url"
                :firstname="user.firstname"
                :lastname="user.lastname"
                :route="'/me'"
            ></Avatar>
            <form-newpost v-if="action == 'create'"></form-newpost>
            <form-editpost v-else-if="action == 'update'" :post="post" @updatePostHTML="updatePostHTML($event)"></form-editpost>
            <form-sharepost v-else-if="action == 'share'" :post="post" :user="user"></form-sharepost>
            <form-editsharepost v-else-if="action == 'updateShare'" :post="post" :user="user" @updatePostSharedHTML="updatePostSharedHTML()"></form-editsharepost>
        </div>
    </div>
</template>

<script>
import FormNewpost from '../Forms/Posts/Newpost'
import FormEditpost from '../Forms/Posts/Editpost'
import FormSharepost from '../Forms/Posts/Sharepost'
import FormEditSharepost from '../Forms/Posts/EditSharepost'
import Avatar from '../Avatar/Avatar'

export default {
    name: "Modal",
    components: {
        'form-newpost': FormNewpost,
        'form-editpost': FormEditpost,
        'form-sharepost': FormSharepost,
        'form-editsharepost': FormEditSharepost,
        Avatar
    },
    props: [
        'reveal',
        'title',
        'action',
        'user',
        'post',
    ],
    methods: {
        closeModal(event) {
            this.$emit('closeModal', event);
        },
        updatePostHTML(post) {
            this.$emit('updatePostHTML', post);
        },
        updatePostSharedHTML() {
            this.$emit('updatePostSharedHTML');
        }
    }
}
</script>

<style scoped src="./Modal.css"></style>