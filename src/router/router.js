import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {path: '/dashboard', component: () => import('../components/dashboard/dashboard.vue')},
        {path: '/article', component: () => import('../components/article/article.vue')},
        {path: '/addArticle', component: () => import('../components/article/addArticle.vue')}
    ]
})

export default router