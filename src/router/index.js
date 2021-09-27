import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile";
import About from "../views/About";
import Login from "../views/Login";
import LoginWait from "../views/LoginWait";
import Result from "../views/Result";
import Random from "../views/Random";
import Select from "../views/Select";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {}
    },
    {
        path: '/auth/:provider/callback',
        name: 'LoginWait',
        component: LoginWait
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {auth: true}
    },
    {
        path: '/profile/random',
        name: 'Random',
        component: Random,
        meta: {auth: true}
    },
    {
        path: '/profile/select',
        name: 'Select',
        component: Select,
        meta: {auth: true}
    },
    {
        path: '/result/:id',
        name: 'Result',
        component: Result,
        meta: {auth: true}
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.auth) && !localStorage.getItem('AccessToken')) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router
