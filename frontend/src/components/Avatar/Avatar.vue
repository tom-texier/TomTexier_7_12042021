<template>
    <router-link :to="!route ? { name: 'user', params: { id: user_id }} : route" class="no-decoration">
        <div class="user">
            <img v-if="avatar_url" :src="avatar_url" alt="Avatar">
            <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
            <div>
                <p>{{ firstname }} {{ lastname }}</p>
                <p class="job" v-if="job">{{ job }}</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "Avatar",
    props: [
        'user_id',
        'avatar_url',
        'firstname',
        'lastname',
        'job',
        'route'
    ]
}
</script>

<style scoped src="./Avatar.css"></style>