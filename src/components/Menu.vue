<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="@/assets/images/logo_dujuca.png" alt="logo" />
      </a>
      <div class="navbar-burger burger" data-target="menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="menu" class="navbar-menu">
      <div class="navbar-start-items">
        <a class="navbar-item">Página Inicial</a>
        <a class="navbar-item">Como Participar</a>
        <a class="navbar-item">Regulamento</a>
        <a class="navbar-item">Contato</a>
      </div>
      <div class="navbar-end-items">
        <div class="navbar-item">
          <div class="button-labeled">
            <label>Primeiro Acesso</label>
            <a class="button is-yellow">Cadastrar Passaporte</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="button-labeled">
            <label>Já tenho cadastro</label>
            <label>ou cadastrar novo passaporte</label>
            <a class="button is-yellow">Entrar</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
nav.navbar {
  background: #0f66be;
  font-weight: bold;
  padding-bottom: 2em;
  font-size: 1.25rem;
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
</style>