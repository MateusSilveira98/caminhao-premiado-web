<template>
  <article class="home">
    <Menu></Menu>
    <div class="banner">
      <img src="@/assets/images/banner_home_1.jpg" alt="banner1" />
      <img src="@/assets/images/banner_home_2.jpg" alt="banner2" />
    </div>
    <div class="tutorial">
      <h1 class="title font-25">Como Participar</h1>
      <p class="font-25 margin-bottom-2">
        Você concorre a R$ 10.000,00 em prêmios e ainda ganha acesso de até 6 meses ao
        Cresça Play, plataforma com diversos cursos para turbinar seu conhecimento e transformar sua vida.
      </p>
      <div class="tutorialSteps">
        <Step
          v-for="step in tutorialSteps"
          :key="step.id"
          :url="step.url"
          :text="step.text"
          :showArrow="step.showArrow"
          :showLine="step.showLine"
        ></Step>
      </div>
      <p
        class="font-10 margin-top-1"
      >*O(s) número(s) da sorte que você concorrerá pela Loteria Federal são de 5 dígitos e aparecerão de acordo com a quantidade de passaportes cadastrados no momento da confirmação da promoção. Consulte regulamento.</p>
    </div>
    <div class="informations">
      <div class="logo">
        <img src="@/assets/images/cresca_play_pessoas.png" alt="creacaplay" />
      </div>
      <img src="@/assets/images/cresca_play_logo.png" alt="crescaplaylogo" />
      <p
        class="font-25 margin-top-3"
      >Sua plataforma de conteúdos livres, que entrega acesso ilimitado a todo o portfólio*, através de tecnologia 100% online que possibilita uma experiência de aprendizagem digital completa, quando e onde quiser.</p>
      <p class="font-25 margin-bottom-3">
        A sala de aula é onde você quiser e o professor é você quem escolhe.
        Aqui você é o protagonista. Dê um play no seu conhecimento!
      </p>
      <div class="informationsSteps">
        <Step
          v-for="step in informationsSteps"
          :key="step.id"
          :url="step.url"
          :text="step.text"
          :showArrow="step.showArrow"
          :showLine="step.showLine"
        ></Step>
      </div>
      <p
        class="font-10 margin-top-1"
      >*O acesso de até 6 meses à plataforma Cresça Play deverá ser realizado até um dia antes do sorteio. Após esse prazo, o passaporte não será válido. Consulte regulamento.</p>
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
      tutorialSteps: [
        {
          id: mockId++,
          showArrow: true,
          showLine: true,
          url: "passoApasso_1.png",
          text:
            "Adquira seu passaporte em uma das lojas Dujuca. Quanto mais passaportes, mais chances de ganhar."
        },
        {
          id: mockId++,
          showArrow: true,
          showLine: true,
          url: "passoApasso_2.png",
          text:
            "Acesse o site da promoção, insira seu(s) passaporte(s) e realize o seu cadastro."
        },
        {
          id: mockId++,
          showArrow: true,
          showLine: true,
          url: "passoApasso_3.png",
          text:
            "Confirme sua participação clicando no botão: PARTICIPAR DA PROMOÇÃO. Você irá ter acesso a(os) número(s) da sorte* e a plataforma de cursos Cresça Play."
        },
        {
          id: mockId++,
          showArrow: true,
          showLine: true,
          url: "passoApasso_4.png",
          text:
            "Pronto! Você já está concorrendo. Acompanhe o sorteio pela Loteria Federal na data prevista e boa sorte."
        },
        {
          id: mockId++,
          showArrow: false,
          showLine: false,
          url: "passoApasso_5.png",
          text:
            "Se você já está cadastrado e deseja inserir mais passaportes, entre com seu login e senha e insira no seu perfil do aluno."
        }
      ],
      informationsSteps: [
        {
          id: mockId++,
          showArrow: false,
          showLine: false,
          url: "cresca_play_vantagens_1.png",
          text: "Acesso ilimitado por 6 meses"
        },
        {
          id: mockId++,
          showArrow: false,
          showLine: false,
          url: "cresca_play_vantagens_2.png",
          text: "Conteúdos exclusivos"
        },
        {
          id: mockId++,
          showArrow: false,
          showLine: false,
          url: "cresca_play_vantagens_3.png",
          text: "Mobile e desktop"
        },
        {
          id: mockId++,
          showArrow: false,
          showLine: false,
          url: "cresca_play_vantagens_4.png",
          text: "Certificado Digital válido em todo país"
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
    padding-bottom: 12em;
    .title {
      text-transform: uppercase;
    }
    .tutorialSteps {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      position: relative;
    }
  }
  .informations {
    text-align: center;
    background: #f1f1f2;
    padding: 3em;
    position: relative;
    padding-top: 14em;
    .informationsSteps {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      position: relative;
    }
    .logo {
      position: absolute;
      display: flex;
      width: 100%;
      justify-content: center;
      top: -11em;
    }
  }
}
</style>
