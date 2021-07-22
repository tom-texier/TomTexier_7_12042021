import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import LoginPage from '@/pages/Login.vue';
import SignupPage from '@/pages/Signup.vue';

const routes = [

    {
        name: 'Home',
        path: '/',
        component: Home,
        meta: {
            title: 'Accueil | Groupomania'
        }
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: LoginPage,
        meta: {
            title: 'Se connecter | Groupomania'
        }
    },
    {
        name: 'SignupPage',
        path: '/signup',
        component: SignupPage,
        meta: {
            title: "S'inscrire | Groupomania"
        }
    },
    {
        name: 'user',
        path: '/user/:id',
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((route) => {
    document.title = route.meta.title;
})

export default router;