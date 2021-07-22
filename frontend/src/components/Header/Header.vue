<template>
    <nav class="main-header">
        <div class="section-container">
            <router-link to="/">
                <img src="../../assets/icon-left-font.png" alt="Logo de Groupomania">
            </router-link>
            <div class="menu">
                <Avatar
                    :avatar_url="user.avatar_url"
                    :firstname="user.firstname"
                    :lastname="user.lastname"
                    :route="'/me'"
                ></Avatar>
            </div>
        </div>
    </nav>
</template>

<script>

import Avatar from '../Avatar/Avatar'

export default {
    name: "HeaderTop",
    props: [
        'user'
    ],
    components: {
        Avatar
    }
}

</script>

<style src="./Header.css" scoped></style>