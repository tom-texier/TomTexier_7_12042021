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
        </div>
    </div>
</template>

<script>
import FormNewpost from '../Forms/Posts/Newpost'
import FormEditpost from '../Forms/Posts/Editpost'
import Avatar from '../Avatar/Avatar'

export default {
    name: "Modal",
    components: {
        'form-newpost': FormNewpost,
        'form-editpost': FormEditpost,
        Avatar
    },
    props: [
        'reveal',
        'title',
        'action',
        'user',
        'post'
    ],
    methods: {
        closeModal(event) {
            this.$emit('closeModal', event);
        },
        updatePostHTML(post) {
            this.$emit('updatePostHTML', post);
        }
    }
}
</script>

<style scoped src="./Modal.css"></style>