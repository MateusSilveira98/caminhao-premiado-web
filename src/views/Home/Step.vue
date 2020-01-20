<template>
  <section>
    <div class="step">
      <img :src="getImageUrl(url)" alt="step" />
      <p>{{text}}</p>
      <div class="arrow" v-if="showArrow"></div>
      <div class="line" v-if="showLine"></div>
    </div>
  </section>
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
    width: 60%;
    margin: 0 auto;
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
@media (min-width: 320px) and (max-width: 913px) {
  .step {
    display: flex;
    height: 7em;
    text-align: start;
    align-items: center;
    height: 7em;
    img {
      width: 65px;
      height: 65px;
      margin-right: 1em;
    }
    .line {
      position: absolute;
      top: 2em;
      border-top: none;
      border-left: 5px dotted #0f66be;
      height: 100%;
      left: 1.8em;
      width: 0;
    }
    .arrow {
      width: 0;
      left: 1em;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid white;
      top: 6.5em;
    }
  }
}
</style>