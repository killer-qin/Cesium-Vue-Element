import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// const routes = [
//   // {
//   //   path: "/",
//   //   name: "Map",
//   //   component: () => import(/* webpackChunkName: "map" */ "../views/Map.vue")
//   // },
//   {
//     path: '/foo',
//     component: () => import("../views/Map.vue")
//   },
//   {
//     path: '/bar',
//     component: () => import("../components/HelloWorld.vue")
//   }
// ];

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    // 一个“路径参数”使用冒号 : 标记。当匹配到一q个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。
    {
      path: '/user/:id',
      component: () => import("../components/UserId.vue")
    },
    {
      path: '/foo',
      component: () => import("../views/Map.vue")
    },
    {
      path: '/bar',
      component: () => import("../components/HelloWorld.vue")
    },
    {
      path: '/model',
      component: () => import("../components/Model.vue")
    },
    {
      path: '/camera',
      component: () => import("../components/Camera.vue")
    },
    {
      path: '/building',
      component: () => import("../components/Building.vue")
    },
    {
      path: '/addpoint',
      component: () => import("../components/addPoint.vue")
    },
    {
      path: '/CZML',
      component: () => import("../components/CZML.vue")
    }

  ]
});

export default router;
