<template>
    <div v-if="reveal" class="modal-box" @click="closeModal">
        <div class="modal-content">
            <div class="title">
                <h2>{{ title }}</h2>
                <i class="fas fa-times" @click="closeModal"></i>
            </div>
            <div class="user">
                <img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar">
                <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
                <p>{{ user.firstname }} {{ user.lastname }}</p>
            </div>
            <form-newpost></form-newpost>
        </div>
    </div>
</template>

<script>
import FormNewpost from '../Forms/Posts/Newpost'

export default {
    name: "Modal",
    components: {
        'form-newpost': FormNewpost
    },
    props: [
        'reveal',
        'title',
        'action',
        'user'
    ],
    methods: {
        closeModal(event) {
            this.$emit('closeModal', event);
        }
    }
}
</script>

<style scoped src="./Modal.css"></style>