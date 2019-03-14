import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {path: '/dashboard', component: () => import('../components/dashboard/dashboard.vue')},
        {path: '/article/:type', component: () => import('../components/article/article.vue')},
        {path: '/addArticle', component: () => import('../components/article/addArticle.vue')},
        {path: '/recycle', component: () => import('../components/article/recycle.vue')},
        {path: '/catalog', component: () => import('../components/catalog/catalog.vue')}
    ]
})

export default router