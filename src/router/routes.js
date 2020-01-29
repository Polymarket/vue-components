
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'address', component: () => import('pages/GetAddress.vue') },
      { path: 'delegation', component: () => import('pages/Delegation.vue') },
      { path: 'rewards', component: () => import('pages/Rewards.vue') },
      { path: 'governance', component: () => import('pages/Governance.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
