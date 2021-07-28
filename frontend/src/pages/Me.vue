<template>
    <div id="page">
        <header-top :user="user"></header-top>
        <div class="section-container">
            <div class="container row">
                <page-aside :user="user"></page-aside>
                <main>
                    <FormEditUser :currentUser="user"></FormEditUser>
                </main>
            </div>
            <footer>
                <a @click="openConfirm">Supprimer mon compte</a>
            </footer>
        </div>
        <main-footer></main-footer>
        <Confirm
            :reveal="revealConfirm"
            :title="titleModal"
            :action="action"
            @closeConfirm="closeConfirm"
            :userID="user.ID"
            :message="message"
        ></Confirm>
    </div>
</template>

<script>

import HeaderTop from '../components/Header/Header'
import Aside from '../components/Aside/Aside'
import FormEditUser from '../components/Forms/Users/Edituser'
import Footer from '../components/Footer/Footer'
import Confirm from '../components/Modal/Confirm'

import { getCurrentUser } from '../mixins/user'

export default {
    name: "Me",
    data() {
        return {
            user: {},
            revealConfirm: false,
            titleModal: "",
            action: "",
            
        }
    },
    components: {
        'header-top': HeaderTop,
        'page-aside': Aside,
        FormEditUser,
        'main-footer': Footer,
        Confirm
    },
    async mounted() {
        this.user = await getCurrentUser();
    },
    methods: {
        openConfirm() {
            this.revealConfirm = true;
            this.titleModal = "Êtes-vous sûr ?";
            this.message = "Une fois votre compte supprimé, toutes vos publications seront supprimées ainsi que toutes vos interactions avec les publications des autres utilisateurs.";
            this.action = 'deleteUser';
        },
        closeConfirm(e) {
            if(e.target === e.currentTarget) {
                this.revealConfirm = false;
            }
        },
    }
}
</script>

<style scoped lang="scss">
    #page main {
        width: calc(70% - 50px);
    }
    #page footer {
        width: calc(70% - 50px);
        margin-left: auto;
        margin-top: 30px;
        padding: 0 20px;
    }

    #page footer a {
        color: #FD2D01;
        cursor: pointer;
        display: block;
        text-align: center;
    }
    #page footer a:hover {
        color: #e42801;
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        #page main {
            width: 100%;
        }
        #page footer {
            width: 100%;
        }
    }
</style>