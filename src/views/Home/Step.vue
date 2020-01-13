<template>
  <div class="step">
    <img :src="getImageUrl(url)" alt="step" />
    <p>{{text}}</p>
    <div class="arrow" v-if="showArrow"></div>
    <div class="line" v-if="showLine"></div>
  </div>
</template>

<script>
export default {
  props: {
    url: { type: String, default: "" },
    text: { type: String, default: "" },
    showArrow: { type: Boolean, default: false },
    showLine: { type: Boolean, default: false }
  },
  methods: {
    getImageUrl(url) {
      return require(`@/assets/images/${url}`);
    }
  }
};
</script>

<style lang="scss">
.step {
  position: relative;
  width: 100%;
  .line {
    position: absolute;
    top: 2.1em;
    border-top: 5px dotted #0f66be;
    width: 100%;
    left: 10em;
  }
  .arrow {
    width: 0;
    height: 0;
    position: absolute;
    top: 1.3em;
    right: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid white;
    z-index: 10;
  }
  img {
    z-index: 10;
    position: relative;
  }
  p {
    font-size: 0.8300920204603125rem;
  }
}
@media (min-width: 914px) and (max-width: 1519px) {
  .step {
    .line {
      left: 7em;
    }
  }
}
@media (min-width: 1520px) and (max-width: 1680px) {
  .step {
    .line {
      left: 8em;
    }
  }
}
</style>