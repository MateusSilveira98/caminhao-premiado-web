<template>
  <article class="home">
    <Menu></Menu>
    <div class="banner">
      <img src="@/assets/images/banner_home_1.jpg" alt="banner1" />
      <img src="@/assets/images/banner_home_2.jpg" alt="banner2" />
    </div>
    <div class="tutorial">
      <h1 class="title">Como Participar</h1>
      <p class="font-24 margin-bottom-2">
        Você concorre a R$ 10.000,00 em prêmios e ainda ganha acesso de até 6 meses ao
        Cresça Play, plataforma com diversos cursos para turbinar seu conhecimento e transformar sua vida.
      </p>
      <div class="steps">
        <Step v-for="step in steps" :key="step.id" :url="step.url" :text="step.text" :showArrow="step.showArrow"></Step>
      </div>
      <p
        class="margin-top-1"
      >*O(s) número(s) da sorte que você concorrerá pela Loteria Federal são de 5 dígitos e aparecerão de acordo com a quantidade de passaportes cadastrados no momento da confirmação da promoção. Consulte regulamento.</p>
    </div>
    <div class="informations">
      
    </div>
  </article>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import Modal from "@/components/Modal.vue";
import Menu from "@/components/Menu.vue";
import Step from "./Step.vue";
let mockId = 1;
export default {
  components: {
    Modal,
    Menu,
    Step
  },
  data() {
    return {
      steps: [
        {
          id: mockId++,
          showArrow: true,
          url: "passoApasso_1.png",
          text:
            "Adquira seu passaporte em uma das lojas Dujuca. Quanto mais passaportes, mais chances de ganhar."
        },
        {
          id: mockId++,
          showArrow: true,
          url: "passoApasso_2.png",
          text:
            "Acesse o site da promoção, insira seu(s) passaporte(s) e realize o seu cadastro."
        },
        {
          id: mockId++,
          showArrow: true,
          url: "passoApasso_3.png",
          text:
            "Confirme sua participação clicando no botão: PARTICIPAR DA PROMOÇÃO. Você irá ter acesso a(os) número(s) da sorte* e a plataforma de cursos Cresça Play."
        },
        {
          id: mockId++,
          showArrow: true,
          url: "passoApasso_4.png",
          text:
            "Pronto! Você já está concorrendo. Acompanhe o sorteio pela Loteria Federal na data prevista e boa sorte."
        },
        {
          id: mockId++,
          showArrow: false,
          url: "passoApasso_5.png",
          text:
            "Se você já está cadastrado e deseja inserir mais passaportes, entre com seu login e senha e insira no seu perfil do aluno."
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.home {
  .banner {
    width: 100%;
    background: #ffcc38;
    img {
      width: 50%;
      height: 100%;
    }
  }
  .tutorial {
    text-align: center;
    background: #ffcc38;
    padding: 3em;
    .title {
      text-transform: uppercase;
    }
    .title,
    .title ~ p {
      font-size: 2.0752300625rem;
      &:last-child {
        font-size: 0.8300920204603125rem;
      }
    }
    .steps {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      position: relative;
    }
  }
}
</style>
