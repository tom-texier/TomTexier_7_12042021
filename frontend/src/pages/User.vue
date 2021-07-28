<template>
    <div id="page">
        <header-top :user="currentUser"></header-top>
        <div class="section-container row">
            <page-aside :user="currentUser"></page-aside>
            <main>
                <HeaderUser :user="user"></HeaderUser>
                <div class="posts" v-if="posts">
                <Post
                    v-for="post in posts.posts"
                    :key="post" :post="post"
                    :currentUserId="user.ID"
                    :currentUserRole="user.role"
                    @deletePostHTML="deletePostHTML($event)"
                    @updatePostHTML="updatePostHTML($event)"
                ></Post>
                </div>
                <p v-else>Cet utilisateur n'a rien publié pour le moment.</p>
            </main>
        </div>
    </div>
</template>

<script>

import HeaderTop from '../components/Header/Header'
import Aside from '../components/Aside/Aside'
import HeaderUser from '../components/User/Header'
import Post from '../components/Post/Post'

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
        Post
    },
    async mounted() {
        this.currentUser = await getCurrentUser();
        this.user = await getOneUser(this.$route.params.id);
        document.title = `${this.user.firstname} ${this.user.lastname} | Groupomania`;
    console.log(this.user);
        this.posts = await getAllPostsByUserId(this.$route.params.id);
    },
}
</script>

<style scoped lang="scss">
    #page main {
        width: calc(70% - 50px);
    }
</style>