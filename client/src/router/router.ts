import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
// auth
import SignInView from '../views/auth/SignInView.vue';
import SignUpView from '../views/auth/SignUpView.vue';
// user
import UserView from '../views/user/UserView.vue';
import PatientRegisterView from '../views/user/PatientRegisterView.vue';
import UserFormView from '../views/user/UserFormView.vue';
//base
import BaseView from '../views/BaseView.vue';
//admin
import AdminHomeView from '../views/admin/AdminHomeView.vue';
import AdminProfessionlView from '../views/admin/AdminProfessionalView.vue';
import AdminQuestionView from '../views/admin/AdminQuestionView.vue';
import AdminAssignsView from '../views/admin/AdminAssignsView.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/login' },

    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUpView,
    },
    {
        path: '/signIn',
        name: 'SignIn',
        component: SignInView,
    },
    {
        path: '/user',
        name: 'User',
        component: BaseView,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '',
                name: 'Profile',
                component: UserView,
            },
            {
                path: 'register',
                name: 'Register',
                component: PatientRegisterView,
            },
            {
                path: 'form',
                name: 'Form',
                component: UserFormView,
            },
        ],
    },
    {
        path: '/admin',
        name: 'Admin',
        component: BaseView,
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        },
        children: [
            {
                path: '',
                name: 'AdminHome',
                component: AdminHomeView,
            },
            {
                path: 'professional',
                name: 'Professional',
                component: AdminProfessionlView,
            },
            {
                path: 'question',
                name: 'Question',
                component: AdminQuestionView,
            },
            {
                path: 'assign',
                name: 'Assign',
                component: AdminAssignsView,
            },
        ],
    },
    { path: '/:catchAll(.*)', redirect: '/signIn' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(
    (
        to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (!token) {
                return next({ name: 'SignIn' });
            } else if (
                to.matched.some((record) => record.meta.requiresAdmin) &&
                role !== 'admin'
            ) {
                return next({ name: 'Profile' });
            }
        }
        next();
    }
);

export default router;
