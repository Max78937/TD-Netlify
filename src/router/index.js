import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/Profile.vue';
import Films from '../views/Films.vue';
import DetailFilm from '../views/DetailFilm.vue';
import Favorite from '../views/Favorite.vue';
import AuthGuard from "@/security/AuthGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'films',
      component: Films
    },
    {
      path: '/detail-film/:title/:id',
      name: 'detailFilm',
      component: DetailFilm,
      beforeEnter: AuthGuard
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
      beforeEnter: AuthGuard
    },
    {
      path: '/Profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    }
  ]
});

export default router
