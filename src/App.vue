<template>
  <div>
    <Loading :showLoading="loading"></Loading>
    <Notification
      @close="showNotification = $event"
      :open="showNotification"
      :type="messageClass"
      :duration="5000"
      :message="message"
    ></Notification>
    <Menu @selected="verifySelectedItem"></Menu>
    <router-view />
  </div>
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
      this.showNotification = newValue;
    },
    showNotification(newValue) {
      this.$store.state.toNotify = newValue;
    }
  },
  data() {
    return {
      showNotification: false
    };
  },
  methods: {
    verifySelectedItem(item) {
      if (this.$route.path == "/rules" && item !== "rules") {
        this.$router.push("/");
        this.$store.dispatch("setSelectedMenuItem", item);
      } else if (item === "rules") {
        this.$router.push("/rules");
      }
    }
  }
};
</script>

<style lang="scss">
</style>
