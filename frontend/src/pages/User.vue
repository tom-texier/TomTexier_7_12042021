<template>
    <div id="page">
        <header-top :user="currentUser"></header-top>
        <div class="section-container row">
            <page-aside :user="currentUser"></page-aside>
            <main>
                <HeaderUser v-if="user.ID != currentUser.ID" :user="user"></HeaderUser>
                <div class="posts" v-if="posts">
                <Post
                    v-for="post in posts.posts"
                    :key="post" :post="post"
                    :currentUserId="currentUser.ID"
                    :currentUserRole="currentUser.role"
                    :currentUser="currentUser"
                    @deletePostHTML="deletePostHTML($event)"
                    @updatePostHTML="updatePostHTML($event)"
                ></Post>
                </div>
                <p v-else>Cet utilisateur n'a rien publié pour le moment.</p>
            </main>
        </div>
        <main-footer></main-footer>
    </div>
</template>

<script>

import HeaderTop from '../components/Header/Header'
import Aside from '../components/Aside/Aside'
import HeaderUser from '../components/User/Header'
import Post from '../components/Post/Post'
import Footer from '../components/Footer/Footer'

import { getCurrentUser, getOneUser } from '../mixins/user'
import { getAllPostsByUserId } from '../mixins/post'

export default {
    name: "User",
    data() {
        return {
            currentUser: {},
            user: {},
            posts: ""
        }
    },
    components: {
        'header-top': HeaderTop,
        'page-aside': Aside,
        HeaderUser,
        Post,
        'main-footer': Footer
    },
    async beforeRouteUpdate (to) {
        this.user = await getOneUser(to.params.id);
        document.title = `${this.user.firstname} ${this.user.lastname} | Groupomania`;
        this.posts = await getAllPostsByUserId(to.params.id);
    },
    async mounted() {
        this.currentUser = await getCurrentUser();
        this.user = await getOneUser(this.$route.params.id);
        document.title = `${this.user.firstname} ${this.user.lastname} | Groupomania`;
        this.posts = await getAllPostsByUserId(this.$route.params.id);
    },
    methods: {
        deletePostHTML(postID) {
            document.getElementById(`post-${postID}`).remove();
        },
        updatePostHTML(data) {
            document.getElementById(`post-${data.post.id}`).querySelector('.description').innerHTML = data.post.description;
            document.getElementById(`post-${data.post.id}`).querySelector('.img img').src = data.post.image;
        }
    }
}
</script>

<style scoped lang="scss">
    #page main {
        width: calc(70% - 50px);
    }

    @media (max-width: 768px) {
        #page main {
            width: 100%;
        }
    }
</style>