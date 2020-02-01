import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/LoginComponent';
import AdminComponent from './components/AdminComponent';
import RolesComponent from './components/RolesComponent';


Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/login'
},
    {
        path: '/login',
        component: LoginComponent,
        name: 'Login'
    },
    // Dynamic Routes
    {
        path: '/admin',
        component: AdminComponent,
        name: 'Admin',
        // children property use likes other Routes
            children:[
                {
                path: 'roles',
                component: RolesComponent,
                name: 'Roles',
            },
            ],
        //For Checking the Token if exits then Going to dashboard or else going to Login Page....
        beforeEnter: (to, from, next) => {
            axios.get('api/verify')
                .then(res => next())
                .catch(err => next('/login'))

        }
    }


]

const router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token') || null
    window.axios.defaults.headers['Authorization'] = "Bearer "+ token;
    next();
});

export default router;
