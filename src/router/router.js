import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from '../vuex/store'

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/layout/dashboard'},
        {path: '/login', component: () => import('../components/login/login.vue')},
        {path: '/layout', component: () => import('../components/cellComponents/layout.vue'), children: [
            {path: 'dashboard', component: () => import('../components/dashboard/dashboard.vue')},
            {path: 'article/:type', component: () => import('../components/article/article.vue')},
            // path: '/article/:type' type=recycle为回收站,其他为文章列表约定为type=list
            {path: 'addArticle', component: () => import('../components/article/addArticle.vue')},
            {path: 'catalog', component: () => import('../components/catalog/catalog.vue')},
            {path: 'comments', component: () => import('../components/comments/comments.vue')},
            {path: 'user', component: () => import('../components/user/user.vue')},
            {path: 'navMenu', component: () => import('../components/navMenu/navMenu.vue')},
            {path: 'siteSet', component: () => import('../components/siteSet/siteSet.vue')},
            {path: 'permissionList', component: () => import('../components/permission/list.vue')},
            {path: 'role', component: () => import('../components/role/role.vue')}
        ]}        
    ]
})

router.beforeEach((to, from, next) => {
    if(from.path != '/login') {
        store.commit('setLastUrl', from.path)
    }
    next()
})

export default router