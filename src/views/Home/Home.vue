<template>
  <article class="home">
    <Menu></Menu>
    <div class="banner">
      <img src="@/assets/images/banner_home_1.jpg" alt="banner1">
      <img src="@/assets/images/banner_home_2.jpg" alt="banner2">
    </div>
  </article>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import Modal from '@/components/Modal.vue';
import Menu from '@/components/Menu.vue';
export default {
 components: {
   Modal,
   Menu
 },
 data() {
   return {
   }
 }
};
</script>

<style lang='scss' scoped>
.home {
  .banner {
    width: 100%;
    img {
      width: 50%;
    }
  }
}
</style>
