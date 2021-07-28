<template>
    <header>
        <div class="bg-primary">
            <a :href="`mailto:${user.email}`" class="contact"><i class="far fa-paper-plane"></i></a>
        </div>
        <img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar">
        <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
        <div class="infos">
            <h3>{{ user.firstname }} {{ user.lastname }}</h3>
            <p class="job">{{ user.job }}</p>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderUser",
    props: [
        'user'
    ]
}
</script>

<style scoped src="./Header.css"></style>