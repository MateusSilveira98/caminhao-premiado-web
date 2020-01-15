<template>
  <article class="home">
    <div class="banner" ref="home">
      <img src="@/assets/images/banner_home_1.jpg" alt="banner1" />
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
      >Sorteio(s) vinculado à Título de Capitalização, modalidade Incentivo, emitido pela ZURICH BRASIL CAPITALIZAÇÃO S/A., CNPJ 17.266.009/0001-41 e Processo SUSEP n° 15414.901582/2018-96. Período de vigência desta Promoção Comercial: 04/11/2019 a 31/01/2020. A aprovação deste título pela SUSEP não implica, por parte da Autarquia, em incentivo ou recomendação a sua aquisição, representando exclusivamente, sua adequação as normas em vigor. O titular sempre terá direito ao recebimento em dinheiro se assim o desejar. Consulte o Regulamento completo e as Condições Gerais do Título de Capitalização desta Promoção Comercial no site https://www.zurich.com.br/pt-br/empresariais/capitalizacao.</p>
      <div class="font-10 margin-top-3">
        <img src="@/assets/images/cresca_play_icon.png" alt="crescalogo" />
        <p class="margin-top-1">&copy;CRESÇA PLAY 2020 - Todos os direitos reservados</p>
      </div>
    </div>
    <Modal :showModal="showModal" @close="handleModal()">
      <section class="passaport" v-if="showPassports">
        <header class="flex justify-between">
          <span class="title">Passaporte</span>
          <a @click="handleModal()">
            <i class="fa fa-times font-25"></i>
          </a>
        </header>
        <label class="label">Adicione o(os) número(s) do seu(s) passaporte(s)</label>
        <div class="field has-addons" v-for="input in inputs" :key="input.id">
          <p class="control is-expanded">
            <input class="input" v-model="input.value" type="text" placeholder="00000000" />
          </p>
          <p class="control" v-if="inputs.length > 1 || input.value">
            <a class="button is-danger" @click="removeInputField(input)">
              <i class="fa fa-trash"></i>
            </a>
          </p>
        </div>
        <a
          class="button is-fullwidth"
          @click="addInputField()"
          v-if="inputs.length < 5"
        >Adicionar mais um passaporte</a>
        <p class="font-10 margin-top-4 margin-bottom-4">
          Caso já tenha feito o cadastro e deseja cadastrar mais códigos para concorrer a promoção,
          <a>acesse a plataforma com seu CPF</a> e senha cadastrados e siga as instruções
        </p>
        <footer>
          <a class="button is-info is-fullwidth" @click="savePassport(inputs)">Confirmar</a>
        </footer>
      </section>
      <section class="user-form" v-if="showUserForm">
        <header class="flex justify-between aling-items-center margin-bottom-1">
          <div class="flex align-item-center">
            <a class="margin-right-1 font-20" @click="showPassports = true; showUserForm = false;">
              <i class="fa fa-arrow-left"></i>
            </a>
            <span class="title">Adicionar seus dados</span>
          </div>
          <a class="font-25" @click="handleModal()">
            <i class="fa fa-times"></i>
          </a>
        </header>
        <div class="field">
          <p class="control">
            <label class="label">Nome</label>
            <input class="input" v-model="user.name" type="text" placeholder="Fulano de tal" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Email</label>
            <input class="input" v-model="user.email" type="email" placeholder="exemplo@ex.com" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">CPF</label>
            <input class="input" v-model="user.cpf" type="text" placeholder="000.000.000-00" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Celular/Telefone</label>
            <input
              class="input"
              v-model="user.phone"
              type="text"
              placeholder="00900000000 ou 0000000000"
            />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Data de nascimento</label>
            <input class="input" v-model="user.date" type="date" placeholder="dd/mm/yyyy" />
          </p>
        </div>
        <div class="field">
          <label class="label">Sexo</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="gender" value="masculino" v-model="user.gender" />
              masculino
            </label>
            <label class="radio">
              <input type="radio" name="gender" value="feminino" v-model="user.gender" />
              feminino
            </label>
            <label class="radio">
              <input type="radio" name="gender" value="outro" v-model="user.gender" />
              prefiro não informar
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">Estado e cidade</label>
          <div class="columns">
            <div class="column">
              <div class="select is-fullwidth">
                <select
                  class="is-fullwidth"
                  v-model="user.state"
                  @change="getCitiesByState(user.state)"
                >
                  <option selected disabled>Selecione seu estado</option>
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="state"
                  >{{state.sigla}} - {{state.nome}}</option>
                </select>
              </div>
            </div>
            <div class="column">
              <div class="select is-fullwidth">
                <select class="is-fullwidth" v-model="user.city">
                  <option selected disabled>Selecione sua cidade</option>
                  <option v-for="city in cities" :key="city.id" :value="city.nome">{{city.nome}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <a class="button is-info is-fullwidth" @click="saveUser()">Confirmar</a>
        </footer>
      </section>
      <section class="password" v-if="showPassword">
        <header class="flex justify-between aling-items-center margin-bottom-1">
          <div class="flex align-item-center">
            <a class="margin-right-1 font-20" @click="showUserForm = true; showPassword = false;">
              <i class="fa fa-arrow-left"></i>
            </a>
            <span class="title">Senha de acesso a plataforma</span>
          </div>
          <a class="font-25" @click="handleModal()">
            <i class="fa fa-times"></i>
          </a>
        </header>
        <div class="field">
          <p class="control">
            <label class="label">Senha</label>
            <input
              class="input"
              v-model="user.password"
              type="password"
              minlength="8"
              placeholder="crie uma senha com o mínimo de 8 caractéres"
            />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Confirmar senha</label>
            <input
              class="input"
              v-model="user.confirmPassword"
              type="password"
              minlength="8"
              placeholder="confirme sua senha"
            />
          </p>
        </div>
        <footer>
          <a class="button is-info is-fullwidth" @click="savePassword()">Salvar</a>
        </footer>
      </section>
      <section class="confirm-datas" v-if="showConfirmDatas">
        <header class="flex justify-between aling-items-center margin-bottom-1">
          <div class="flex align-item-center">
            <a
              class="margin-right-1 font-20"
              @click="showPassword = true; showConfirmDatas = false;"
            >
              <i class="fa fa-arrow-left"></i>
            </a>
            <span class="title">Confime seus dados</span>
          </div>
          <a class="font-25" @click="handleModal()">
            <i class="fa fa-times"></i>
          </a>
        </header>
        <div class="field">
          <div class="control">
            <label class="label">Seus passaportes</label>
            <div class="select is-fullwidth">
              <select class="is-fullwidth">
                <option selected disabled>veja seus passaportes</option>
                <option v-for="passport in user.passports" :key="passport.id">{{passport.value}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Nome</label>
            <input class="input" v-model="user.name" type="text" placeholder="Fulano de tal" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Email</label>
            <input class="input" v-model="user.email" type="email" placeholder="exemplo@ex.com" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">CPF</label>
            <input class="input" v-model="user.cpf" type="text" placeholder="000.000.000-00" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Celular/Telefone</label>
            <input
              class="input"
              v-model="user.phone"
              type="text"
              placeholder="00900000000 ou 0000000000"
            />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Data de nascimento</label>
            <input class="input" v-model="user.date" type="date" placeholder="dd/mm/yyyy" />
          </p>
        </div>
        <div class="field">
          <label class="label">Sexo</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="gender" value="masculino" v-model="user.gender" />
              masculino
            </label>
            <label class="radio">
              <input type="radio" name="gender" value="feminino" v-model="user.gender" />
              feminino
            </label>
            <label class="radio">
              <input type="radio" name="gender" value="outro" v-model="user.gender" />
              prefiro não informar
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">Estado e cidade</label>
          <div class="columns">
            <div class="column">
              <div class="select is-fullwidth">
                <select
                  class="is-fullwidth"
                  v-model="user.state"
                  @change="getCitiesByState(user.state)"
                >
                  <option selected disabled>Selecione seu estado</option>
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="state"
                  >{{state.sigla}} - {{state.nome}}</option>
                </select>
              </div>
            </div>
            <div class="column">
              <div class="select is-fullwidth">
                <select class="is-fullwidth" v-model="user.city">
                  <option selected disabled>Selecione sua cidade</option>
                  <option v-for="city in cities" :key="city.id" :value="city.nome">{{city.nome}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <a class="button is-info is-fullwidth" @click="confirm()">Salvar</a>
        </footer>
      </section>
      <section class="random-number" v-if="showNumber">
        <header class="margin-bottom-1">
          <span class="title">Parabéns</span>
        </header>
        <div class="field">
          <strong>Sua participação no sorteio está confirmada e seu acesso a plataforma Cresça Play está liberado :)</strong>
        </div>
        <div class="field">
          <strong>Agora aproveite e dê um play no seu conhecimento</strong>
        </div>
        <div class="field">
          <strong>Veja seu(s) número(s) da sorte</strong>
        </div>
        <div class="field" v-for="number in user.numbers" :key="number">
          <strong>{{number}}</strong>
        </div>
        <footer>
          <a class="button is-info is-fullwidth" @click="handleModal()">Acesse o Cresça Play</a>
        </footer>
      </section>
    </Modal>
  </article>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import Modal from "@/components/Modal.vue";
import Step from "./Step.vue";
import services from "@/store/services";
let mockId = 1;
export default {
  components: {
    Modal,
    Step
  },
  computed: {
    ...mapState(["menuItem"])
  },
  watch: {
    menuItem(value) {
      if (value !== "register") this.goToItem(value);
      else this.handleModal();
    }
  },
  data() {
    return {
      showModal: false,
      showPassports: true,
      showUserForm: false,
      showPassword: false,
      showConfirmDatas: false,
      showNumber: false,
      states: [],
      cities: [],
      inputs: [
        {
          id: mockId++,
          value: ""
        }
      ],
      user: {},
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
  },
  methods: {
    goToItem(item) {
      if (item) {
        let element = this.$refs[item];
        let top = element.offsetTop;
        window.scroll({ behavior: "smooth" });
        window.scrollTo(0, top);
      }
    },
    handleModal() {
      this.showModal = !this.showModal;
      this.$store.dispatch("setSelectedMenuItem", "");
    },
    addInputField() {
      if (this.inputs.length < 5) this.inputs.push({ id: mockId++, value: "" });
    },
    removeInputField(input) {
      if (this.inputs.length > 1)
        this.inputs.splice(this.inputs.indexOf(input), 1);
      else this.inputs[0].value = "";
    },
    savePassport(inputs) {
      this.user.passports = inputs;
      this.user.numbers = [];
      for (let index = 0; index < this.user.passports.length; index++) {
        this.user.numbers.push(Math.floor(Math.random() * 1000));
      }
      this.showUserForm = true;
      this.showPassports = false;
    },
    saveUser() {
      this.showUserForm = false;
      this.showPassword = true;
    },
    savePassword() {
      this.showPassword = false;
      this.showConfirmDatas = true;
    },
    confirm() {
      this.showConfirmDatas = false;
      this.showNumber = true;
    },
    async getCitiesByState(state) {
      let response = await services.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/distritos`
      );
      this.cities = response.data;
    }
  },
  async mounted() {
    let response = await services.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    this.states = response.data;
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
    padding: 3em;
    padding-bottom: 12em;
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
  .contacts {
    text-align: center;
    padding: 3em;
    padding-bottom: 0;
    position: relative;
  }
}
@media (min-width: 360px) and (max-width: 800px) {
  .home {
    top: 3em;
  }
}
</style>
