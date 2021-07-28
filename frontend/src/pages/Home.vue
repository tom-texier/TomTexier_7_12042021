<template>
    <div id="page">
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
                    :currentUser="user"
                    @deletePostHTML="deletePostHTML($event)"
                    @updatePostHTML="updatePostHTML($event)"
                ></Post>
            </main>
        </div>
        <main-footer></main-footer>
    </div>
</template>

<script>
import HeaderTop from '../components/Header/Header'
import NewPost from '../components/Newpost/Newpost'
import Aside from '../components/Aside/Aside'
import Post from '../components/Post/Post'
import Footer from '../components/Footer/Footer'

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
        'main-footer': Footer,
        Post
    },
    async mounted() {
        this.user = await getCurrentUser();
        this.posts = await getAllPosts();
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

<style lang="scss" scoped>
main {
    width: calc(70% - 50px);
}

@media (max-width: 768px) {
    main {
        width: 100%;
    }
}
</style>