<template>
    <article :id="`post-${post.ID}`">
        <header>
            <Avatar
                :user_id="post.id_user"
                :avatar_url="post.avatar_url"
                :firstname="post.firstname"
                :lastname="post.lastname"
                :job="post.job"
            ></Avatar>
            <nav class="post-actions" v-if="currentUserId === post.id_user || currentUserRole === 'admin'">
                <div class="toggle" @click="showMenu" tabindex="0">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <ul class="menu" v-if="toggleMenu">
                    <li @click="openModal" tabindex="0"><i class="fas fa-pencil-alt"></i>Modifier</li>
                    <li tabindex="0"><i class="far fa-trash-alt"></i>Supprimer</li>
                </ul>
            </nav>
        </header>
        <main class="content">
            <p class="description" v-html="post ? post.description : ''"></p>
            <div class="img">
                <img :src="post.image" alt="Image de l'article">
            </div>
        </main>
        <modal :reveal="reveal" :title="titleModal" :action="action" @closeModal="closeModal" :user="user" :post="post"></modal>
    </article>
</template>

<script>

import Avatar from '../Avatar/Avatar'
import Modal from '../Modal/Modal'

export default {
    name: "Post",
    data() {
        return {
            toggleMenu: false,
            reveal: false,
            titleModal: "",
            action: "",
            user: ""
        }
    },
    components: {
        Avatar,
        'modal': Modal
    },
    props: [
        'post',
        'currentUserId',
        'currentUserRole',
    ],
    methods: {
        showMenu() {
            this.toggleMenu = true;
            window.addEventListener("click", (evt) => {
                const postActionsMenu = document.querySelector(`#post-${this.post.ID} .post-actions`);
                let targetElement = evt.target; // clicked element

                do {
                    if (targetElement == postActionsMenu) {
                        // This is a click inside. Do nothing, just return.
                        return;
                    }
                    // Go up the DOM
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                // This is a click outside.
                this.hideMenu();

            });
            window.removeEventListener("click", (evt) => {
                const postActionsMenu = document.querySelector(`#post-${this.post.ID} .post-actions`);
                let targetElement = evt.target; // clicked element

                do {
                    if (targetElement == postActionsMenu) {
                        // This is a click inside. Do nothing, just return.
                        return;
                    }
                    // Go up the DOM
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                // This is a click outside.
                this.hideMenu();

            });
        },
        hideMenu() {
            this.toggleMenu = false;
        },
        openModal() {
            this.hideMenu();
            this.reveal = true;
            this.titleModal = "Modifier le post";
            this.action = 'update';
            this.user = {
                'ID': this.post.id_user,
                'avatar_url': this.post.avatar_url,
                'firstname': this.post.firstname,
                'lastname': this.post.lastname,
            }
        },
        closeModal(e) {
            if(e.target === e.currentTarget) {
                this.reveal = false;
            }
        }
    }
}
</script>

<style scoped src="./Post.css"></style>