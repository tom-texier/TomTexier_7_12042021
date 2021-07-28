<template>
    <div id="page">
        <header-top :user="user"></header-top>
        <div class="section-container row">
            <page-aside :user="user"></page-aside>
            <main>
                <FormEditUser :currentUser="user"></FormEditUser>
            </main>
        </div>
    </div>
</template>

<script>

import HeaderTop from '../components/Header/Header'
import Aside from '../components/Aside/Aside'
import FormEditUser from '../components/Forms/Users/Edituser'

import { getCurrentUser } from '../mixins/user'

export default {
    name: "Me",
    data() {
        return {
            user: {},
        }
    },
    components: {
        'header-top': HeaderTop,
        'page-aside': Aside,
        FormEditUser
    },
    async mounted() {
        this.user = await getCurrentUser();
    },
}
</script>

<style scoped lang="scss">
    #page main {
        width: calc(70% - 50px);
    }
</style>