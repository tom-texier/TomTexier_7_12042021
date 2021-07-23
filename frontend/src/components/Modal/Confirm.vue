<template>
    <div v-if="reveal" class="modal-box confirm-box" @click="closeConfirm">
        <div class="modal-content">
            <header class="title">
                <h2>{{ title ? title : "Êtes-vous sûr ?" }}</h2>
                <i class="fas fa-times" @click="closeConfirm"></i>
            </header>
            <main>
                <p>{{ message ? message : "Cette action est irréversible." }}</p>
            </main>
            <footer>
                <a aria-role="button" class="cancel" @click="closeConfirm">Annuler</a>
                <a aria-role="button" class="confirm" @click="confirm">Confirmer</a>
            </footer>
        </div>
    </div>
</template>

<script>

import { deletePost } from '../../mixins/post';

export default {
    name: "Confirm",
    props: [
        'reveal',
        'title',
        'message',
        'action',
        'post'
    ],
    methods: {
        closeConfirm(event) {
            this.$emit('closeConfirm', event);
        },
        confirm() {
            if(this.action == "deletePost") {
                deletePost(this.post.ID)
                    .then(postID => {
                        this.deletePostHTML(postID);
                    })
                    .catch(err => console.log(err));
            }
        },
        deletePostHTML(postID) {
            this.$emit('deletePostHTML', postID);
        }
    }
}
</script>

<style scoped src="./Modal.css"></style>