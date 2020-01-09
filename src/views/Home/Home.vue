<template>
  <article class="home">
    <button @click="toggleModal = !toggleModal">Toggle Modal</button>
    <Modal :showModal="toggleModal" @close="toggleModal = $event">
      <p>HOME</p>
    </Modal>
  </article>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import Modal from '@/components/Modal.vue';
export default {
 components: {
   Modal
 },
 data() {
   return {
     toggleModal: false
   }
 }
};
</script>

<style lang='scss' scoped>

</style>
