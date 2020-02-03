<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" @click="selectMenu('home'); isBurgerActive = !isBurgerActive">
        <img src="@/assets/images/logo_dujuca.png" alt="logo" />
      </a>
      <div
        class="navbar-burger burger"
        @click="isBurgerActive = !isBurgerActive"
        v-bind:class="{ 'is-active': isBurgerActive }"
        data-target="menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="menu" class="navbar-menu" v-bind:class="{ 'is-active': isBurgerActive }">
      <div class="navbar-start-items">
        <a
          class="navbar-item"
          @click="selectMenu('home'); isBurgerActive = !isBurgerActive"
        >Página Inicial</a>
        <a
          class="navbar-item"
          @click="selectMenu('tutorial'); isBurgerActive = !isBurgerActive"
        >Como Participar</a>
        <a
          class="navbar-item"
          @click="selectMenu('informations'); isBurgerActive = !isBurgerActive"
        >Conheça o cresça play</a>
        <a
          class="navbar-item"
          @click="selectMenu('rules'); isBurgerActive = !isBurgerActive"
        >Regulamento</a>
        <a
          class="navbar-item"
          @click="selectMenu('contact'); isBurgerActive = !isBurgerActive"
        >Contato</a>
      </div>
      <div class="navbar-end-items">
        <div class="navbar-item">
          <div class="button-labeled">
            <a
              class="button"
              @click="selectMenu('register'); isBurgerActive = !isBurgerActive"
            >Cadastrar Passaporte</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="button-labeled">
            <label>Acesse o</label>
            <a
              :href="crescaURL"
              class="button login-button"
              @click="isBurgerActive = !isBurgerActive"
            >
              <img src="@/assets/images/botao_crescaplay.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isBurgerActive: false
    };
  },
  computed: {
    ...mapState(["crescaURL"])
  },
  methods: {
    selectMenu(item) {
      this.$emit("selected", item);
    }
  }
};
</script>

<style lang="scss">
nav.navbar {
  background: #0f66be;
  font-weight: bold;
  font-size: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 1em 0;
  .navbar-burger.burger {
    color: white;
  }
  a.navbar-item {
    color: white;
    text-transform: uppercase;
    font-weight: normal;
    img {
      width: 115px;
      max-height: 60px;
    }
  }
  .navbar-end-items {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 40%;
    .button-labeled {
      position: relative;
      label {
        display: block;
        color: white;
        font-size: 0.8300920204603125rem;
        margin: 0;
        font-weight: normal;
        position: absolute;
        bottom: 2.7em;
      }
      .button,
      .login-button {
        margin: 0;
        background: #ffcc38;
        color: #0f66be;
        border: none;
        border-radius: 0;
        font-size: 0.75rem;
        text-transform: uppercase;
        width: 100%;
      }
      .login-button {
        background: #6db2fc;
      }
    }
  }
  .navbar-start-items {
    display: flex;
    justify-content: space-between;
    margin: 0 1em;
    width: 100%;
  }
}
@media screen and (max-width: 1295px) {
  nav.navbar {
    padding: 0;
    min-height: 3.25rem;
    .navbar-menu.is-active {
      background: #0f66be;
      .navbar-start-items,
      .navbar-end-items {
        display: block;
        width: 100%;
        margin: 0;
      }
    }
    a.navbar-item,
    .navbar-item {
      margin-top: 0;
      img {
        width: 60px;
        max-height: 1.75rem;
      }
    }
    .navbar-end-items {
      width: 100%;
      .button {
        width: 100%;
        &:first-child {
          margin-bottom: 1em;
        }
      }
    }
    .navbar-start-items {
      width: 100%;
      margin: 0;
    }
  }
  .navbar-brand {
    width: 100%;
  }
  .navbar-item,
  .navbar-link {
    align-items: center !important;
    display: flex !important;
  }
  .navbar-burger {
    display: block !important;
    margin-left: auto !important;
    position: relative !important;
  }
  .navbar-menu {
    display: none !important;
  }
  .navbar-menu.is-active {
    display: block !important;
    position: absolute;
    width: 100%;
    top: 3em;
  }
  nav.navbar.is-transparent a.navbar-item:focus,
  nav.navbar.is-transparent a.navbar-item:hover,
  nav.navbar.is-transparent a.navbar-item.is-active,
  nav.navbar.is-transparent .navbar-link:focus,
  nav.navbar.is-transparent .navbar-link:hover,
  nav.navbar.is-transparent .navbar-link.is-active {
    background: #ffcc38 !important;
    color: #0f66be !important;
  }
}
</style>