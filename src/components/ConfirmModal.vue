<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" aria-label="close" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        <span class="title">{{text}}</span>
      </section>
      <footer class="modal-card-foot flex justify-content right align-items center">
        <button
          v-if="!hideCancelButton"
          class="button"
          @click="closeModal()"
          :class="cancel.className ? `is-${cancel.className}` : 'is-default'"
        >{{cancel.text}}</button>
        <button
          v-if="!showOkButton"
          class="button"
          @click="send(item)"
          :class="ok.className ? `is-${ok.className}` : 'is-danger'"
        >{{ok.text}}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} },
    showModal: { type: Boolean, default: false },
    title: { type: String, default: "Excluir" },
    text: { type: String, default: "Deseja excluir?" },
    okButton: { type: Object, default: () => {} },
    cancelButton: { type: Object, default: () => {} },
    hideOkButton: {type: Boolean, default: false},
    hideCancelButton: {type: Boolean, default: false}
  },
  watch: {
    okButton(newValue) {
      this.ok = newValue;
    },
    cancelButton(newValue) {
      this.cancel = newValue;
    }
  },
  data() {
    return {
      ok: { className: "", text: "Sim" },
      cancel: { className: "", text: "Não" }
    };
  },
  methods: {
    send(item) {
      this.$emit("send", item);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close", false);
    }
  }
};
</script>

<style>
</style>
