<template>
    <div class="newpost">
        <img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar">
        <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
        <div class="input" title="Créer un post" @click="openModal">
            <i class="fas fa-paper-plane"></i>
            Commencer un post
        </div>
        <modal :reveal="reveal" :title="titleModal" :action="action" @closeModal="closeModal" :user="user"></modal>
    </div>
</template>

<script>
import Modal from '../Modal/Modal'

export default {
    name: "Newpost",
    data() {
        return {
            reveal: false,
            titleModal: "",
            action: ""
        }
    },
    methods: {
        openModal(e) {
            this.reveal = true;
            this.titleModal = e.currentTarget.getAttribute('title');
        },
        closeModal(e) {
            if(e.target === e.currentTarget) {
                this.reveal = false;
            }
        }
    },
    components: {
        'modal': Modal
    },
    props: [
        'user'
    ]
}
</script>

<style scoped src="./Newpost.css"></style>