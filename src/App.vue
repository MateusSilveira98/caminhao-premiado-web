<template>
  <article>
    <Loading :showLoading="loading"></Loading>
    <Notification
      @close="showNotification = $event"
      :open="showNotification"
      :type="messageClass"
      :duration="2500"
      :message="message"
    ></Notification>
    <Menu @selected="verifySelectedItem"></Menu>
    <router-view />
  </article>
</template>
<script>
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";
import Menu from "@/components/Menu.vue";
import { mapState } from "vuex";
export default {
  components: {
    Loading,
    Menu,
    Notification
  },
  computed: {
    ...mapState(["loading", "messageClass", "message", "toNotify"])
  },
  watch: {
    toNotify(newValue) {
      this.showNotification = !newValue;
    }
  },
  data() {
    return {
      showNotification: false
    };
  },
  methods: {
    verifySelectedItem(item) {
      if (item !== "login") this.$store.dispatch("setSelectedMenuItem", item);
      else window.location.href = "#";
    }
  }
};
</script>

<style lang="scss">
</style>
