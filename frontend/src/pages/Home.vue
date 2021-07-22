<template>
    <div id="page" @click="hideMenu">
        <header-top :user="user"></header-top>
        <div class="section-container row">
            <page-aside :user="user"></page-aside>
            <main>
                <new-post :user="user"></new-post>
                <Post
                    v-for="post in posts.posts"
                    :key="post" :post="post"
                    :currentUserId="user.ID"
                    :currentUserRole="user.role"
                ></Post>
            </main>
        </div>
    </div>
</template>

<script>
import HeaderTop from '../components/Header/Header'
import NewPost from '../components/Newpost/Newpost'
import Aside from '../components/Aside/Aside'
import Post from '../components/Post/Post'

import { getCurrentUser } from '../mixins/user'
import { getAllPosts } from '../mixins/post'

export default {
    name: "Home",
    data() {
        return {
            user: {},
            posts: [],
        }
    },
    components: {
        'header-top': HeaderTop,
        'new-post': NewPost,
        'page-aside': Aside,
        Post
    },
    async mounted() {
        this.user = await getCurrentUser();
        this.posts = await getAllPosts();
    }
}
</script>

<style lang="scss" scoped>
main {
    width: calc(70% - 50px);
}
</style>