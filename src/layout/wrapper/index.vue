<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <header>
        <TopRocker></TopRocker>
      </header>
      <MenuRocker></MenuRocker>
    </div>
    <div class="page-wrapper">
      <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
    <BotRocker></BotRocker>
  </div>
</template>
<script>
import "../../assets/assets/js/bootstrap.bundle.min.js";
import "../../assets/assets/js/jquery.min.js";
import "../../assets/assets/plugins/simplebar/js/simplebar.min.js";
import "../../assets/assets/plugins/metismenu/js/metisMenu.min.js";
import "../../assets/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import "../../assets/assets/js/index.js";
import "../../assets/assets/js/app.js";
import TopRocker from "../components/TopRocker.vue";
import MenuRocker from "../components/MenuRocker.vue";
import BotRocker from "../components/BotRocker.vue";
export default {
  app: "#app",
  components: {
    TopRocker,
    MenuRocker,
    BotRocker,
  },
};
</script>
<style>
@import "../../assets/assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/assets/css/bootstrap.min.css";
@import "../../assets/assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import "../../assets/assets/css/app.css";   
@import "../../assets/assets/css/icons.css";
@import "../../assets/assets/css/dark-theme.css";
@import "../../assets/assets/css/semi-dark.css";
@import "../../assets/assets/css/header-colors.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css");
@import url("https://cdn.jsdelivr.net/npm/vue/dist/vue.js");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js");
</style>