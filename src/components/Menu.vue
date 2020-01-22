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
              :href="config.CRESCA_URL"
              class="button login-button"
              @click="isBurgerActive = !isBurgerActive"
            >
              <img src="@/assets/images/botao_crescaplay.png" alt />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import config from '@/config.json';

export default {
  data() {
    return {
      config,
      isBurgerActive: false
    };
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
  padding-bottom: 2.5em;
  padding-top: 0.5em;
  font-size: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  .navbar-burger.burger {
    color: white;
  }
  a.navbar-item {
    color: white;
    text-transform: uppercase;
    margin-top: 2.3em;
    font-weight: normal;
    img {
      width: 100%;
    }
  }
  .navbar-end-items {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 50%;
    .button-labeled {
      label {
        display: block;
        color: white;
        font-size: 0.8300920204603125rem;
        margin: 0;
        font-weight: normal;
        position: relative;
        bottom: 0.3em;
        &:last-child {
          margin-bottom: 0.5em;
        }
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
@media (min-width: 320px) and (max-width: 913px) {
  nav.navbar {
    padding-bottom: 0;
    .navbar-menu.is-active {
      background: #0f66be;
      .navbar-start-items,
      .navbar-end-items {
        display: block;
        width: 100%;
        margin: 0;
      }
    }
    a.navbar-item {
      margin-top: 0;
      &:hover {
        background: #ffcc38 !important;
        color: #0f66be !important;
      }
      img {
        width: 100%;
      }
    }
    .navbar-end-items {
      width: 100%;
      .button {
        width: 100%;
      }
    }
    .navbar-start-items {
      width: 100%;
      margin: 0;
    }
  }
}
</style>