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
        <label class="label">
          <span class="has-text-danger">*</span>Adicione o(s) número(s) do seu(s) passaporte(s)
        </label>
        <div class="field has-addons" v-for="passport in user.passports" :key="passport.id">
          <div class="control is-expanded">
            <TheMask
              class="input"
              v-model="passport.value"
              type="tel"
              :mask="['####.####.####.####']"
              placeholder="0000.0000.0000.0000"
              maxlength="20"
              v-bind:class="{'is-danger': passport.validator.isInvalid }"
            />
            <span
              class="has-text-danger"
              v-if="passport.validator.isInvalid"
            >{{passport.validator.message}}</span>
          </div>
          <p class="control" v-if="user.passports.length > 1 || passport.value">
            <a class="button is-danger" @click="removeInputField(passport)">
              <i class="fa fa-trash"></i>
            </a>
          </p>
        </div>
        <a
          class="button is-fullwidth"
          @click="addInputField()"
          v-if="user.passports.length < 5"
        >Adicionar mais um passaporte</a>
        <p class="font-10 margin-top-4 margin-bottom-4">
          Caso já tenha feito o cadastro e deseja cadastrar mais códigos para concorrer a promoção,
          <a>acesse a plataforma com seu CPF</a> e senha cadastrados e siga as instruções
        </p>
        <footer>
          <a class="button is-fullwidth is-info" @click="savePassport()">Confirmar</a>
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
            <label class="label">
              <span class="has-text-danger">*</span>Nome
            </label>
            <input
              class="input"
              v-model="user.name.value"
              type="text"
              placeholder="Fulano de tal"
              v-bind:class="{'is-danger': user.name.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.name.validator.isInvalid"
            >{{user.name.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Email
            </label>
            <input
              class="input"
              v-model="user.email.value"
              type="email"
              placeholder="exemplo@ex.com"
              v-bind:class="{'is-danger': user.email.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.email.validator.isInvalid"
            >{{user.email.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>CPF
            </label>
            <TheMask
              :mask="['###.###.###-##']"
              type="tel"
              v-model="user.cpf.value"
              placeholder="000.000.000-00"
              class="input"
              v-bind:class="{'is-danger': user.cpf.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.cpf.validator.isInvalid"
            >{{user.cpf.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Celular/Telefone
            </label>
            <TheMask
              :mask="['(##) ####-####', '(##) #####-####']"
              type="tel"
              v-model="user.phone.value"
              placeholder="(00) 9 0000-0000 ou (00) 0000-0000"
              class="input"
              v-bind:class="{'is-danger': user.phone.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.phone.validator.isInvalid"
            >{{user.phone.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Data de nascimento
            </label>
            <input
              class="input"
              v-model="user.date.value"
              type="date"
              placeholder="dd/mm/yyyy"
              v-bind:class="{'is-danger': user.date.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.date.validator.isInvalid"
            >{{user.date.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <label class="label">
            <span class="has-text-danger">*</span>Sexo
          </label>
          <div class="control flex align-items-center justify-between">
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="masculino" v-model="user.gender" />
              <span class="margin-left-1">masculino</span>
            </label>
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="feminino" v-model="user.gender" />
              <span class="margin-left-1">feminino</span>
            </label>
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="outro" v-model="user.gender" />
              <span class="margin-left-1">prefiro não informar</span>
            </label>
          </div>
        </div>
        <div class="field">
          <div class="columns">
            <div class="column">
              <label class="label">
                <span class="has-text-danger">*</span>Estado
              </label>
              <div class="select is-fullwidth">
                <select
                  class="is-fullwidth"
                  v-model="user.state.value"
                  @change="getCitiesByState(user.state.value)"
                  v-bind:class="{'is-danger': user.state.validator.isInvalid}"
                >
                  <option selected disabled>Selecione seu estado</option>
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="state"
                  >{{state.sigla}} - {{state.nome}}</option>
                </select>
              </div>
              <span
                class="has-text-danger"
                v-if="user.state.validator.isInvalid"
              >{{user.state.validator.message}}</span>
            </div>
            <div class="column">
              <label class="label">
                <span class="has-text-danger">*</span>Cidade
              </label>
              <div class="select is-fullwidth">
                <select
                  class="is-fullwidth"
                  v-model="user.city.value"
                  v-bind:class="{'is-danger': user.city.validator.isInvalid}"
                >
                  <option selected disabled>Selecione sua cidade</option>
                  <option v-for="city in cities" :key="city.id" :value="city.nome">{{city.nome}}</option>
                </select>
              </div>
              <span
                class="has-text-danger"
                v-if="user.city.validator.isInvalid"
              >{{user.city.validator.message}}</span>
            </div>
          </div>
        </div>
        <footer class="field">
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
            <label class="label">
              <span class="has-text-danger">*</span>Senha
            </label>
            <input
              class="input"
              v-model="user.password.value"
              type="password"
              minlength="8"
              placeholder="crie uma senha com o mínimo de 8 caractéres"
              v-bind:class="{'is-danger': user.password.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.password.validator.isInvalid"
            >{{user.password.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Confirmar senha
            </label>
            <input
              class="input"
              v-model="user.confirmPassword.value"
              type="password"
              minlength="8"
              placeholder="confirme sua senha"
              v-bind:class="{'is-danger': user.confirmPassword.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.confirmPassword.validator.isInvalid"
            >{{user.confirmPassword.validator.message}}</span>
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
            <label class="label">
              <span class="has-text-danger">*</span>Nome
            </label>
            <input
              class="input"
              v-model="user.name.value"
              type="text"
              placeholder="Fulano de tal"
              v-bind:class="{'is-danger': user.name.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.name.validator.isInvalid"
            >{{user.name.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Email
            </label>
            <input
              class="input"
              v-model="user.email.value"
              type="email"
              placeholder="exemplo@ex.com"
              v-bind:class="{'is-danger': user.email.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.email.validator.isInvalid"
            >{{user.email.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>CPF
            </label>
            <TheMask
              :mask="['###.###.###-##']"
              type="tel"
              v-model="user.cpf.value"
              placeholder="000.000.000-00"
              class="input"
              v-bind:class="{'is-danger': user.cpf.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.cpf.validator.isInvalid"
            >{{user.cpf.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Celular/Telefone
            </label>
            <TheMask
              :mask="['(##) ####-####', '(##) #####-####']"
              type="tel"
              v-model="user.phone.value"
              placeholder="(00) 9 0000-0000 ou (00) 0000-0000"
              class="input"
              v-bind:class="{'is-danger': user.phone.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.phone.validator.isInvalid"
            >{{user.phone.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>Data de nascimento
            </label>
            <input
              class="input"
              v-model="user.date.value"
              type="date"
              placeholder="dd/mm/yyyy"
              v-bind:class="{'is-danger': user.date.validator.isInvalid}"
            />
            <span
              class="has-text-danger"
              v-if="user.date.validator.isInvalid"
            >{{user.date.validator.message}}</span>
          </p>
        </div>
        <div class="field">
          <label class="label">
            <span class="has-text-danger">*</span>Sexo
          </label>
          <div class="control flex align-items-center justify-between">
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="masculino" v-model="user.gender" />
              <span class="margin-left-1">masculino</span>
            </label>
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="feminino" v-model="user.gender" />
              <span class="margin-left-1">feminino</span>
            </label>
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="outro" v-model="user.gender" />
              <span class="margin-left-1">prefiro não informar</span>
            </label>
          </div>
        </div>
        <div class="field">
          <div class="columns">
            <div class="column">
              <label class="label">
                <span class="has-text-danger">*</span>Estado
              </label>
              <div class="select is-fullwidth">
                <select
                  class="is-fullwidth"
                  v-model="user.state.value"
                  @change="getCitiesByState(user.state.value)"
                  v-bind:class="{'is-danger': user.state.validator.isInvalid}"
                >
                  <option selected disabled>Selecione seu estado</option>
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="state"
                  >{{state.sigla}} - {{state.nome}}</option>
                </select>
              </div>
              <span
                class="has-text-danger"
                v-if="user.state.validator.isInvalid"
              >{{user.state.validator.message}}</span>
            </div>
            <div class="column">
              <label class="label">
                <span class="has-text-danger">*</span>Cidade
              </label>
              <div class="select is-fullwidth">
                <select
                  class="is-fullwidth"
                  v-model="user.city.value"
                  v-bind:class="{'is-danger': user.city.validator.isInvalid}"
                >
                  <option selected disabled>Selecione sua cidade</option>
                  <option v-for="city in cities" :key="city.id" :value="city.nome">{{city.nome}}</option>
                </select>
              </div>
              <span
                class="has-text-danger"
                v-if="user.city.validator.isInvalid"
              >{{user.city.validator.message}}</span>
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
import { TheMask } from "vue-the-mask";
import { formValidator } from "@/utils";
let mockId = 1;
export default {
  components: {
    Modal,
    Step,
    TheMask
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
      user: {
        passports: [
          {
            id: mockId++,
            value: null,
            validator: {
              isInvalid: false,
              message: ""
            }
          }
        ],
        gender: "outro",
        name: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        email: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        cpf: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        phone: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        date: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        state: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        city: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        password: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        confirmPassword: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        }
      },
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
      this.reset();
    },
    addInputField() {
      if (this.user.passports.length < 5)
        this.user.passports.push({
          id: mockId++,
          value: null,
          validator: { isInvalid: false, message: "" }
        });
    },
    removeInputField(passport) {
      if (this.user.passports.length > 1)
        this.user.passports.splice(this.user.passports.indexOf(passport), 1);
      else this.user.passports[0].value = "";
    },
    checkConditionsToValidator(
      requiredCondition = null,
      lengthCondition = null,
      emailCondition = null
    ) {
      return {
        isInvalid:
          (requiredCondition && requiredCondition !== "isValid") ||
          (lengthCondition && lengthCondition !== "isValid") ||
          (emailCondition && emailCondition !== "isValid"),
        message:
          requiredCondition === "isValid"
            ? lengthCondition === "isValid"
              ? emailCondition
              : lengthCondition
            : requiredCondition
      };
    },
    savePassport() {
      let isValidArray = [];
      let requiredCondition = "";
      let lengthCondition = "";
      for (let index = 0; index < this.user.passports.length; index++) {
        let { value, validator } = this.user.passports[index];
        requiredCondition = formValidator(
          value,
          "required",
          "informe seu passaporte."
        );
        lengthCondition = formValidator(
          { value, qtd: 16 },
          "length",
          "insira no mínimo 16 números."
        );
        validator = this.checkConditionsToValidator(
          requiredCondition,
          lengthCondition
        );
        isValidArray.push(!validator.isInvalid);
        this.user.passports[index].validator = validator;
      }
      if (isValidArray.filter(value => !value).length === 0) {
        this.user.numbers = [];
        for (let index = 0; index < this.user.passports.length; index++) {
          this.user.numbers.push(Math.floor(Math.random() * 1000));
        }
        this.showUserForm = true;
        this.showPassports = false;
      }
    },
    saveUser() {
      let isValidArray = [];
      let requiredCondition = "";
      let emailCondition = "";
      let propsArray = [
        { prop: "name", message: "seu nome" },
        { prop: "cpf", message: "seu cpf" },
        { prop: "phone", message: "seu celular ou telefone" },
        { prop: "date", message: "sua data de nascimento" },
        { prop: "state", message: "seu estado" },
        { prop: "city", message: "sua cidade" }
      ];
      Object.keys(this.user).forEach(key => {
        let { value, validator } = this.user[key];
        let valuePropName = propsArray.find(p => p.prop === key);
        if (valuePropName) {
          requiredCondition = formValidator(
            value,
            "required",
            `informe ${valuePropName.message}`
          );
          validator = this.checkConditionsToValidator(requiredCondition);
          isValidArray.push(!validator.isInvalid);
          this.user[key].validator = validator;
        }
      });
      requiredCondition = formValidator(
        this.user.email.value,
        "required",
        "informe seu email"
      );
      emailCondition = formValidator(
        this.user.email.value,
        "email",
        "insira um email válido"
      );
      this.user.email.validator = this.checkConditionsToValidator(
        requiredCondition,
        "isValid",
        emailCondition
      );
      if (this.user.email.validator.isInvalid)
        isValidArray.push(!this.user.email.validator.isInvalid);
      if (isValidArray.filter(value => !value).length === 0) {
        this.showUserForm = false;
        this.showPassword = true;
      }
    },
    savePassword() {
      let isValidArray = [];
      let requiredCondition = "";
      let lengthCondition = "";
      let propsArray = [
        { prop: "password", message: "informe sua senha" },
        { prop: "confirmPassword", message: "insira a confirmação da senha" }
      ];
      Object.keys(this.user).forEach(key => {
        let { value, validator } = this.user[key];
        let valuePropName = propsArray.find(p => p.prop === key);
        if (valuePropName) {
          requiredCondition = formValidator(
            value,
            "required",
            valuePropName.message
          );
          lengthCondition = formValidator(
            { value, qtd: 8 },
            "length",
            "insira no mínimo 8 caratéres"
          );
          validator = this.checkConditionsToValidator(
            requiredCondition,
            lengthCondition
          );
          isValidArray.push(!validator.isInvalid);
          this.user[key].validator = validator;
        }
      });
      if (!this.user.confirmPassword.validator.isInvalid)
        this.user.confirmPassword.validator = {
          isInvalid:
            this.user.password.value !== this.user.confirmPassword.value,
          message: "As senhas não se correspondem."
        };
      if (this.user.confirmPassword.validator.isInvalid)
        isValidArray.push(!this.user.confirmPassword.validator.isInvalid);
      if (isValidArray.filter(value => !value).length === 0) {
        this.showPassword = false;
        this.showConfirmDatas = true;
      }
    },
    confirm() {
      let isValidArray = [];
      let requiredCondition = "";
      let emailCondition = "";
      let propsArray = [
        { prop: "name", message: "seu nome" },
        { prop: "cpf", message: "seu cpf" },
        { prop: "phone", message: "seu celular ou telefone" },
        { prop: "date", message: "sua data de nascimento" },
        { prop: "state", message: "seu estado" },
        { prop: "city", message: "sua cidade" }
      ];
      Object.keys(this.user).forEach(key => {
        let { value, validator } = this.user[key];
        let valuePropName = propsArray.find(p => p.prop === key);
        if (valuePropName) {
          requiredCondition = formValidator(
            value,
            "required",
            `informe ${valuePropName.message}`
          );
          validator = this.checkConditionsToValidator(requiredCondition);
          isValidArray.push(!validator.isInvalid);
          this.user[key].validator = validator;
        }
      });
      requiredCondition = formValidator(
        this.user.email.value,
        "required",
        "informe seu email"
      );
      emailCondition = formValidator(
        this.user.email.value,
        "email",
        "insira um email válido"
      );
      this.user.email.validator = this.checkConditionsToValidator(
        requiredCondition,
        "isValid",
        emailCondition
      );
      if (this.user.email.validator.isInvalid)
        isValidArray.push(!this.user.email.validator.isInvalid);
      if (isValidArray.filter(value => !value).length === 0) {
        this.showConfirmDatas = false;
        this.showNumber = true;
      }
    },
    async getCitiesByState(state) {
      let response = await services.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/municipios`
      );
      this.cities = _.orderBy(response.data, "nome");
    },
    reset() {
      this.showPassports = true;
      this.showUserForm = false;
      this.showPassword = false;
      this.showConfirmDatas = false;
      this.showNumber = false;
      this.user = {
        passports: [
          {
            id: mockId++,
            value: null,
            validator: {
              isInvalid: false,
              message: ""
            }
          }
        ],
        gender: "outro",
        name: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        email: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        cpf: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        phone: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        date: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        state: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        city: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        password: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        },
        confirmPassword: {
          value: null,
          validator: {
            isInvalid: false,
            message: ""
          }
        }
      };
    }
  },
  async mounted() {
    let response = await services.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    this.states = _.orderBy(response.data, "nome");
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
