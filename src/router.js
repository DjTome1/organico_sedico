import { createRouter, createWebHistory } from 'vue-router';

import organico from './App.vue';

const routes = [
  { path: '/home', component: organico },
  { path: '/', redirect: '/home' } // home va a dashboard
];


const router = createRouter({
  history: createWebHistory('/OrganicoSedico/'),
  base: '/OrganicoSedico/',
  routes,
});


export default router;