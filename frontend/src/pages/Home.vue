<template>
    <div id="page">
        <header-top :user="user"></header-top>
        <div class="section-container row">
            <page-aside></page-aside>
            <main>
                <new-post :user="user"></new-post>
            </main>
        </div>
    </div>
</template>

<script>
import HeaderTop from '../components/Header/Header'
import NewPost from '../components/Newpost/Newpost'
import Aside from '../components/Aside/Aside'

import { getCurrentUser } from '../mixins/user'

export default {
    name: "Home",
    data() {
        return {
            user: {}
        }
    },
    components: {
        'header-top': HeaderTop,
        'new-post': NewPost,
        'page-aside': Aside
    },
    mounted() {
        getCurrentUser().then(data => {
            this.user = data;
        })
        .catch(err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>
main {
    width: 100%;
}
</style>