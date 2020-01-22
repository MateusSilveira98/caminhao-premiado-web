<template>
  <article class="home">
    <div class="banner" ref="home">
      <img src="@/assets/images/banner_home_1.1.jpg" alt="banner1" />
      <img src="@/assets/images/banner_home_2.jpg" alt="banner2" />
    </div>
    <div class="tutorial" ref="tutorial">
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
    <div class="informations" ref="informations">
      <div class="logo">
        <img src="@/assets/images/cresca_play_pessoas.png" alt="creacaplay" />
      </div>
      <img src="@/assets/images/cresca_play_logo.png" alt="crescaplaylogo" />
      <p
        class="font-25 margin-top-3 margin-bottom-1"
      >Sua plataforma de conteúdos livres, que entrega acesso ilimitado a todo o portfólio*, através de tecnologia 100% online que possibilita uma experiência de aprendizagem digital completa, quando e onde quiser.</p>
      <p class="font-25 margin-bottom-1">
        A sala de aula é onde você quiser e o professor é você quem escolhe.
        Aqui você é o protagonista. Dê um play no seu conhecimento!
      </p>
      <p class="font-25 has-text-centered margin-bottom-1">
        <a :href="config.CRESCA_URL" class="button">Acesse</a>
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
        class="font-10 margin-top-3"
      >O tempo de acesso à plataforma para visualização dos e-books, será de até 06 (seis) meses por passaporte cadastrado, contados do primeiro acesso. Assim, este prazo poderá se estender de acordo com a quantidade de passaportes cadastrados</p>
    </div>
    <div class="contacts" ref="contact">
      <h1 class="title font-25">Contato</h1>
      <div class="columns">
        <div class="column flex align-items-center justify-end">
          <img src="@/assets/images/email_icon.png" alt="email" />
          <span class="font-15 margin-left-1">contato@crescaplay.com.br</span>
        </div>
        <div class="column flex align-items-center justify-start">
          <img src="@/assets/images/whatsapp_icon.png" alt="whatsapp" />
          <div class="has-text-left margin-left-1">
            <span>(11) 99497-3716</span>
            <p>Atendimento de segunda à sexta das 10h às 17h.</p>
          </div>
        </div>
      </div>
      <p
        class="font-10 margin-top-3"
      >Sorteio(s) vinculado à Título de Capitalização, modalidade Incentivo, emitido pela ZURICH BRASIL CAPITALIZAÇÃO S/A., CNPJ 17.266.009/0001-41 e Processo SUSEP n° 15414.901582/2018-96. Período de vigência desta Promoção Comercial: 01/02/2020 a 31/07/2020. A aprovação deste título pela SUSEP não implica, por parte da Autarquia, em incentivo ou recomendação a sua aquisição, representando exclusivamente, sua adequação as normas em vigor. O titular sempre terá direito ao recebimento em dinheiro se assim o desejar. Consulte o Regulamento completo e as Condições Gerais do Título de Capitalização desta Promoção Comercial no site https://www.zurich.com.br/pt-br/empresariais/capitalizacao.</p>
      <div class="font-10 margin-top-3">
        <img src="@/assets/images/cresca_play_icon.png" alt="crescalogo" />
        <p class="margin-top-1">&copy;CRESÇA PLAY 2020 - Todos os direitos reservados</p>
      </div>
    </div>
    <RegisterModalForm></RegisterModalForm>
  </article>
</template>

<script>
import Step from "./Step.vue";
import RegisterModalForm from "./RegisterModalForm.vue";
import { mapState } from "vuex";
import config from '@/config.json';
let mockId = 1;
export default {
  components: {
    Step,
    RegisterModalForm
  },
  computed: {
    ...mapState(["menuItem"])
  },
  watch: {
    menuItem(value) {
      if (value !== "register" && value !== "rules") this.goToItem(value);
    }
  },
  data() {
    return {
      config,
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
            "Confirme seus dados e clique em salvar para participar da promoção. Você irá ter acesso a(s) número(s) da sorte* e a plataforma de cursos Cresça Play."
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
            "Se você já está cadastrado e deseja inserir mais passaporte, entre com seu CPF em cadastrar passaporte ou insira no seu perfil do aluno na plataforma Cresça Play"
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
  },
  methods: {
    goToItem(item) {
      if (item) {
        let element = this.$refs[item];
        let top = element.offsetTop;
        window.scroll({ behavior: "smooth" });
        window.scrollTo(0, top);
      }
    }
  },
  mounted() {
    if (this.menuItem !== "register" && this.menuItem !== "rules") this.goToItem(this.menuItem);
  }
};
</script>

<style lang='scss' scoped>
.home {
  position: relative;
  top: 8em;
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
    padding: 3em 5em;
    padding-bottom: 12em;
    .tutorialSteps {
      justify-content: center;
      display: grid;
      font-weight: bold;
      position: relative;
      grid-template-columns: auto auto auto auto auto;
      font-weight: bold;
      position: relative;
    }
  }
  .informations {
    text-align: center;
    background: #f1f1f2;
    padding: 3em 5em;
    position: relative;
    padding-top: 14em;
    .button {
      background: #6db2fc;
      font-weight: bold;
      text-transform: uppercase;
      padding: 0.5em 1.5em;
      border-radius: 0;
    }
    .informationsSteps {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      position: relative;
    }
    .logo {
      position: absolute;
      display: flex;
      width: 93%;
      justify-content: center;
      top: -11em;
    }
  }
  .contacts {
    text-align: center;
    padding: 3em;
    padding-bottom: 0;
    position: relative;
  }
}
@media (min-width: 320px) and (max-width: 913px) {
  .home {
    top: 3em;
    .tutorial {
      padding: 1em;
      padding-bottom: 2em;
      .tutorialSteps {
        display: block;
      }
    }
    .informations {
      padding: 1em;
      padding-top: 2em;
      p {
        margin-top: 0;
        margin-bottom: 0;
        margin: 1em 0;
      }
      .informationsSteps {
        display: block;
      }
      .logo {
        display: none;
      }
      .tutorialSteps {
        display: block;
      }
    }
    .contacts {
      padding: 1em;
      position: relative;
      .column {
        justify-content: flex-start;
      }
    }
  }
}
</style>
