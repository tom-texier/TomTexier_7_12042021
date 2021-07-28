<template>
    <div id="page">
        <header-top :user="user"></header-top>
        <div class="section-container row">
            <page-aside :user="user"></page-aside>
            <main>
                <FormEditUser :currentUser="user"></FormEditUser>
            </main>
        </div>
        <main-footer></main-footer>
    </div>
</template>

<script>

import HeaderTop from '../components/Header/Header'
import Aside from '../components/Aside/Aside'
import FormEditUser from '../components/Forms/Users/Edituser'
import Footer from '../components/Footer/Footer'

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
        FormEditUser,
        'main-footer': Footer
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
    @media (max-width: 768px) {
        #page main {
            width: 100%;
        }
    }
</style>