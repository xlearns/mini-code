import { createRouter, createWebHashHistory } from "./router";
import HelloWorldVue from "../components/HelloWorld.vue";
import Test from "../components/test.vue";
const routes: any = [
  {
    path: "/",
    component: HelloWorldVue,
  },
  {
    path: "/test",
    component: Test,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
