import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home.vue';
import works from '@/views/workModule/works.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home //首页
        },
        {
            path: '/works',
            name: 'works',
            component: works,//作品页面
        },
        {
            path: '/works/detial',
            name: 'detial',
            component: () => import('../views/workModule/workDetial.vue'),//作品详情页面
        },
        {
            path: '/life',
            name: 'life',
            component: () => import('../views/Life.vue'),//生平页面
        },
        {
            path: '/netWork',
            name: 'netWork',
            component: () => import('../views/netWork.vue'),//交游页面
        },
        {
            path: '/track',
            name: 'track',
            component: () => import('../views/Track.vue'),//行迹页面
        },

    ]
})

export default router