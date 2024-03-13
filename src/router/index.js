import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrgListView from "@/views/Orgs/OrgListView.vue";
import OrgView from "@/views/Orgs/OrgView.vue";
import TeamView from "@/views/Teams/TeamView.vue";
import TeamListView from "@/views/Teams/TeamListView.vue";
import TeamDetailsView from "@/views/Teams/TeamDetailsView.vue";
import OrgDetailsView from "@/views/Orgs/OrgDetailsView.vue";
import HeroListView from "@/views/Heros/HeroListView.vue";
import HeroView from "@/views/Heros/HeroView.vue";
import store from "@/store";
import LoginView from "@/views/LoginView.vue";
import UserAccountView from "@/views/UserAccount.vue";
import RegisterView from "@/views/RegisterView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user-account',
    name: 'UserAccount',
    component: UserAccountView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/org',
    component: OrgView, // Utilisez OrgView comme layout pour les routes enfants
    children: [
      {
        path: '/',
        name: 'org',
        component: OrgListView
      },
      {
        path: 'details',
        name: 'orgDetails',
        component: OrgDetailsView,
        meta: { levelAuth: 1 },
      }
    ]
  },
  {
    path: '/team',
    component: TeamView, // Utilisez OrgView comme layout pour les routes enfants
    children: [
      {
        path: '/',
        name: 'team',
        component: TeamListView
      },
      {
        path: 'details',
        name: 'teamDetails',
        component: TeamDetailsView,
        meta: { levelAuth: 1 },
      }
    ]
  },

  {
    path: '/hero',
    component: HeroView, // Utilisez OrgView comme layout pour les routes enfants
    children: [
      {
        path: '/',
        name: 'hero',
        component: HeroListView
      },
    ]
  },

  {
    path: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "editOrg" */ '@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function checkAccess(to) {
  // BEWARE: routes without a meta levelAuth field are considered to be public
  if ((to.meta.levelAuth) && (to.meta.levelAuth === 1) && (store.state.secret.auth === false)) {
    return false
  }
  return true
}

// check for all routes needing privileges that user is authenticated



router.beforeEach((to, from, next) => {
  if (to.name === 'error404') {
    store.commit('errors/pushError','Invalid route')
    next('/')
  }
  else if (checkAccess(to)) {
    next()
  }
  else {
    store.commit('errors/pushError','You need to login')
    next('/home');
  }
});
export default router
