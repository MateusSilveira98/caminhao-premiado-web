<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: { type: Boolean, default: false }
  },
  methods: {
    closeModal() {
      this.$emit('close', false);
    }
  }
};
</script>

<style>
</style>
