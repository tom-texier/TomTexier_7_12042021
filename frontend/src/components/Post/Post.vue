<template>
    <article :id="`post-${post.ID}`">
        <header>
            <Avatar
                v-if="post.is_share == 1"
                :user_id="post.id_sharer"
                :avatar_url="post.avatar_sharer"
                :firstname="post.firstname_sharer"
                :lastname="post.lastname_sharer"
                :job="post.job_sharer"
            ></Avatar>
            <nav class="post-actions" v-if="post.is_share == 1 && (currentUserId === post.id_sharer || currentUserRole === 'admin')">
                <div class="toggle" @click="showMenu" tabindex="0">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <ul class="menu" v-if="toggleMenu">
                    <li @click="openModal" tabindex="0"><i class="fas fa-pencil-alt"></i>Modifier</li>
                    <li @click="openConfirm" tabindex="0"><i class="far fa-trash-alt"></i>Supprimer</li>
                </ul>
            </nav>
        </header>
        <p v-if="post.is_share == 1 && post.comment != ''" v-html="post.comment"></p>
        <div :class="post.is_share == 1 ? 'is_share' : ''">
            <header>
                <Avatar
                    :user_id="post.id_user"
                    :avatar_url="post.avatar_url"
                    :firstname="post.firstname"
                    :lastname="post.lastname"
                    :job="post.job"
                ></Avatar>
                <nav class="post-actions" v-if="post.is_share != 1 && (currentUserId === post.id_user || currentUserRole === 'admin')">
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
        </div>
        <footer>
            <div class="metas">
                <div @click="likedPost" aria-role="button" tabindex="0" :class="userLiked ? 'likes active' : 'likes'"><i class="fas fa-thumbs-up"></i><span class="number">{{ post.NB_LIKES }}</span></div>
                <div @click="openModalShare" aria-role="button" tabindex="0" class="shares"><i class="fas fa-share"></i>Partager</div>
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
import { HTTP } from '../../http-constants'
import Cookies from 'js-cookie'

import { likePost, dislikePost } from '../../mixins/post'

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
            message: "",
            userLiked: false,
            thePost: {},
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
        'currentUser'
    ],
    mounted() {
        this.getUserMetasPost(this.currentUserId, this.post.ID);
        this.thePost = this.post;
        console.log(this.thePost);
    },
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
                'ID': this.currentUser.id_user,
                'avatar_url': this.currentUser.avatar_url,
                'firstname': this.currentUser.firstname,
                'lastname': this.currentUser.lastname,
            }
        },
        openModalShare() {
            this.revealModal = true;
            this.titleModal = "Partager le post";
            this.action = 'share';
            this.user = this.currentUser;
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
        },
        getUserMetasPost(userID, postID) {
            HTTP.post('/post/metas', {userID: userID, postID: postID}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + Cookies.get('groupomania_token'),
                }
            })
            .then(response => {
                this.userLiked = response.data.metas.userLiked;
            })
        },
        likedPost() {
            if(this.userLiked) {
                dislikePost(this.post.ID)
                    .then(()=> {
                        this.userLiked = false;
                        this.thePost.NB_LIKES--;
                    })
            }
            else {
                likePost(this.post.ID)
                    .then(()=> {
                        this.userLiked = true;
                        this.thePost.NB_LIKES++;
                    })
            }
        }
    }
}
</script>

<style scoped src="./Post.css"></style>