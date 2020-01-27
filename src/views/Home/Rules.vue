<template>
  <article class="rules">
    <div class="banner">
      <img src="@/assets/images/banner_regulamento.jpg" alt="banner1" />
    </div>
    <div
      class="rule"
      v-bind:style="{ 'background-image': `url(${'../assets/images/bg_regulamento.jpg'})` }"
    >
      <h1 class="title has-text-centered">REGULAMENTO</h1>
      <h1 class="title margin-top-1">Zurich Capitalização</h1>
      <h2 class="subtitle">Regulamento da Promoção Comercial / Modalidade Incentivo</h2>
      <p class="has-text-centered">
        <strong>Nome da Promoção:</strong> Caminhão da Sorte Dujuca
      </p>
      <p class="has-text-centered">
        <strong>Período de vigência da Promoção:</strong> 01/02/2020 a 31/07/2020
      </p>
      <p class="has-text-centered margin-bottom-3">
        <strong>Período de Participação(*) na Promoção:</strong> 23/01/2020 a 31/07/2020
      </p>
      <RulesList
        class="margin-bottom-3"
        v-for="rule in ruleList"
        :key="rule.id"
        :title="rule.title"
        :list="rule.list"
      />
      <p class="has-text-centered">
        <strong>TERMO DE CESSÃO DE DIREITO DE PARTICIPAÇÃO EM SORTEIOS DE TÍTULOS DE CAPITALIZAÇÃO</strong>
      </p>
      <p
        class="has-text-centered margin-top-1"
      >Pelo presente termo, a CIATECH TECNOLOGIA EDUCACIONAL LTDA., inscrita no CNPJ n° 01.367.958/0001-88, que é a empresa PROMOTORA DA PROMOÇÃO e detentora dos Títulos de Capitalização da Modalidade Incentivo, cede gratuitamente ao Participante que aderir a esta Promoção o direito de participação em sorteios, conforme regras definidas neste REGULAMENTO DA PROMOÇÃO, disponível na íntegra Nos sites: https://www.zurich.com.br/pt-br/seguros-empresariais/capitalizacao e http://www.caminhaodasortedujuca.com.br/, e que estará disponível durante todo período de vigência da Promoção. Os sorteios serão garantidos por Títulos de Capitalização emitidos pela ZURICH BRASIL CAPITALIZAÇÃO S/A, inscrita no CNPJ nº 17.266.009/0001-41, aprovado conforme Processo SUSEP nº 15414.901582/2018-96.</p>
    </div>
    <div class="contacts">
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
import RegisterModalForm from "./RegisterModalForm.vue";
import RulesList from "./RulesList.vue";
import ruleList from "./rules.json";
let mockId = 1;
export default {
  components: {
    RegisterModalForm,
    RulesList
  },
  data() {
    return {
      ruleList
    };
  },
  mounted() {
    window.scroll({ behavior: "smooth" });
    window.scrollTo(0, top);
  }
};
</script>

<style lang='scss' scoped>
.rules {
  position: relative;
  top: 6em;
  .banner {
    width: 100%;
    height: 50%;
    background: #ffcc38;
    img {
      width: 100%;
    }
  }
  .rule {
    padding: 2em 3em;
    background-color: white;
    position: relative;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }
  .contacts {
    text-align: center;
    padding: 3em;
    padding-bottom: 0;
    position: relative;
  }
}
@media (min-width: 320px) and (max-width: 1295px) {
  .rules {
    top: 3em;
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
