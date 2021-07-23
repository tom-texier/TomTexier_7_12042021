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
                    <li @click="openConfirm" tabindex="0"><i class="far fa-trash-alt"></i>Supprimer</li>
                </ul>
            </nav>
        </header>
        <main class="content">
            <p class="description" v-html="post ? post.description : ''"></p>
            <div class="img">
                <img :src="post.image" alt="Image de l'article">
            </div>
        </main>
        <footer>
            <div class="metas">
                <div aria-role="button" tabindex="0" class="likes"><i class="fas fa-thumbs-up"></i><span class="number">{{ post.NB_LIKES }}</span></div>
                <div aria-role="button" tabindex="0" class="comments"><i class="fas fa-comment-dots"></i><span class="number">{{ post.NB_COMMENTS }}</span></div>
                <div aria-role="button" tabindex="0" class="shares"><i class="fas fa-share"></i><span class="number">{{ post.NB_SHARES }}</span></div>
            </div>
        </footer>
        <Modal
            :reveal="revealModal"
            :title="titleModal"
            :action="action"
            @closeModal="closeModal"
            :user="user"
            :post="post"
            @updatePostHTML="updatePostHTML($event)"
        ></Modal>
        <Confirm
            :reveal="revealConfirm"
            :title="titleModal"
            :action="action"
            @closeConfirm="closeConfirm"
            :post="post"
            :message="message"
            @deletePostHTML="deletePostHTML($event)"
        ></Confirm>
    </article>
</template>

<script>

import Avatar from '../Avatar/Avatar'
import Modal from '../Modal/Modal'
import Confirm from '../Modal/Confirm'

export default {
    name: "Post",
    data() {
        return {
            toggleMenu: false,
            revealModal: false,
            revealConfirm: false,
            titleModal: "",
            action: "",
            user: "",
            message: ""
        }
    },
    components: {
        Avatar,
        Modal,
        Confirm
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
            this.revealModal = true;
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
                this.revealModal = false;
            }
        },
        openConfirm() {
            this.hideMenu();
            this.revealConfirm = true;
            this.titleModal = "Êtes-vous sûr ?";
            this.message = "Cette action est irréversible. Vous et les autres utilisateurs n'aurez aucun moyen de récupérer cette publication.";
            this.action = 'deletePost';
        },
        closeConfirm(e) {
            if(e.target === e.currentTarget) {
                this.revealConfirm = false;
            }
        },
        deletePostHTML(postID) {
            this.$emit('deletePostHTML', postID);
            this.revealModal = false;
            this.revealConfirm = false;
        },
        updatePostHTML(post) {
            this.$emit('updatePostHTML', post);
            this.revealModal = false;
            this.revealConfirm = false;
        }
    }
}
</script>

<style scoped src="./Post.css"></style>