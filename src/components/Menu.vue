<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item">
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
            <label>Primeiro Acesso</label>
            <a
              class="button is-yellow"
              @click="selectMenu('register'); isBurgerActive = !isBurgerActive"
            >Cadastrar Passaporte</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="button-labeled">
            <label>Já tenho cadastro</label>
            <label>ou cadastrar novo passaporte</label>
            <a
              class="button is-yellow"
              @click="selectMenu('login'); isBurgerActive = !isBurgerActive"
            >Entrar</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
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
  padding-bottom: 2em;
  font-size: 1.25rem;
  position: fixed;
  width: 100%;
  top: 0;
  .navbar-menu.is-active {
    background: #0f66be;
    .navbar-start-items,
    .navbar-end-items {
      display: block;
      width: 100%;
      margin: 0;
    }
  }
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
    width: 60%;
    justify-content: space-between;
    .button-labeled {
      label {
        display: block;
        color: #ffcc38;
        font-size: 0.8300920204603125rem;
        margin: 0;
        font-weight: normal;
        &:last-child {
          margin-bottom: 0.5em;
        }
      }
      .button {
        margin: 0;
        background: #ffcc38;
        color: #0f66be;
        border: none;
        border-radius: 0;
        text-transform: uppercase;
      }
    }
  }
  .navbar-start-items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 1em;
  }
}
@media (min-width: 360px) and (max-width: 800px) {
  nav.navbar {
    padding-bottom: 0;
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