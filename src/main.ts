import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";

createApp(App)
  .use(store)
  .use(router)
  .component("BaseCard", BaseCard)
  .component("BaseButton", BaseButton)
  .component("BaseBadge", BaseBadge)
  .component("BaseDialog", BaseDialog)
  .mount("#app");
