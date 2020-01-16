<template>
  <div :class="['notification', type ? `is-${type}` : '']" v-if="show">
    <button class="delete" @click="closeNotification()"></button>
    <h1 class="title">{{title}}</h1>
    {{message}}
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    duration: Number,
    message: String,
    title: { type: String, default: "" },
    open: { type: Boolean, default: false },
    openPermanently: false
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeNotification() {
      this.show = false;
      this.$emit("close", false);
    },
    openNotification() {
      if (this.openPermanently) {
        this.show = true;
      } else {
        this.show = true;
        setTimeout(() => this.closeNotification(), this.duration);
      }
    }
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.openNotification();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  z-index: 99;
  top: 4em;
  right: 0em;
  left: 0em;
  margin: 0 auto;
  width: 50%;
}
@media (min-width: 320px) and (max-width: 913px) {
  .notification {
    top: 0;
    width: 100%;
  }
}
</style>
