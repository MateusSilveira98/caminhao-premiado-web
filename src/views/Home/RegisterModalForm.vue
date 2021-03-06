<template>
  <Modal :showModal="showModal" @close="handleModal()">
    <section class="login" v-if="showLoginCpf">
      <header class="flex justify-between">
        <span class="title">Informe seu CPF</span>
        <a @click="handleModal()">
          <i class="fa fa-times font-25"></i>
        </a>
      </header>
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
      <footer>
        <a class="button is-fullwidth is-info" @click="loginCpf()">Avançar</a>
      </footer>
    </section>
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
        Caso
        <strong>já esteja cadastrado</strong> e deseja inserir
        <strong>mais passaportes</strong> para concorrer à promoção, insira o seu CPF e clique em
        <strong>adicionar mais passaportes.</strong> Você também pode consulta-los no “Meu Perfil” acessando a plataforma Cresça Play.
      </p>
      <footer>
        <a class="button is-fullwidth is-info" @click="savePassport()">Avançar</a>
      </footer>
    </section>
    <section class="user-form" v-if="showUserForm && !userToSend.idUsuario">
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
            maxlength="80"
            placeholder="Informe seu nome"
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
            <span class="has-text-danger">*</span>E-mail
          </label>
          <input
            class="input"
            v-model="user.email.value"
            type="email"
            maxlength="60"
            placeholder="Informe seu e-mail (EX: exemplo@ex.com)."
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
            v-if="isMobile"
          />
          <template v-if="!isMobile">
            <label @click="openCalendar = !openCalendar;">
              <TheMask
                class="input"
                v-model="user.date.value"
                type="text"
                placeholder="dd/mm/yyyy"
                :mask="['##/##/####']"
                @input="openCalendar = false"
                v-bind:class="{'is-danger': user.date.validator.isInvalid}"
              />
            </label>
            <Datepicker
              :inputClass="{'d-none': true}"
              :disabledDate="disableDate"
              :defaultValue="moment().subtract(18, 'years')"
              v-model="user.date.value"
              format="DD/MM/YYYY"
              :open="openCalendar"
              :appendToBody="true"
              value-type="format"
              @input="openCalendar = false"
              placeholder="dd/mm/yyyy"
            />
          </template>

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
            <input type="radio" name="gender" value="M" v-model="user.gender" />
            <span class="margin-left-1">masculino</span>
          </label>
          <label class="radio flex align-items-center">
            <input type="radio" name="gender" value="F" v-model="user.gender" />
            <span class="margin-left-1">feminino</span>
          </label>
          <label class="radio flex align-items-center">
            <input type="radio" name="gender" value="O" v-model="user.gender" />
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
        <a class="button is-info is-fullwidth" @click="saveUser()">Avançar</a>
      </footer>
    </section>
    <section class="password" v-if="showPassword && !userToSend.idUsuario">
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
            placeholder="crie uma senha com o mínimo de 8 caracteres"
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
        <a class="button is-info is-fullwidth" @click="savePassword()">Avançar</a>
      </footer>
    </section>
    <section class="confirm-datas" v-if="showConfirmDatas">
      <header class="flex justify-between aling-items-center margin-bottom-1">
        <div class="flex align-item-center">
          <span v-if="!userToSend.idUsuario">
            <a
              class="margin-right-1 font-20"
              @click="showPassword = true; showConfirmDatas = false;"
            >
              <i class="fa fa-arrow-left"></i>
            </a>
          </span>
          <span v-if="userToSend.idUsuario">
            <a
              class="margin-right-1 font-20"
              @click="showPassports = true; showConfirmDatas = false;"
            >
              <i class="fa fa-arrow-left"></i>
            </a>
          </span>
          <span class="title">Confime seus dados</span>
        </div>
        <a class="font-25" @click="handleModal()">
          <i class="fa fa-times"></i>
        </a>
      </header>
      <div class="field">
        <label class="label">Passaporte(s)</label>
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
            maxlength="80"
            placeholder="Informe seu nome"
            v-bind:class="{'is-danger': user.name.validator.isInvalid}"
          />
          <span
            class="has-text-danger"
            v-if="user.name.validator.isInvalid"
          >{{user.name.validator.message}}</span>
        </p>
      </div>
      <template v-if="!userToSend.idUsuario">
        <div class="field">
          <p class="control">
            <label class="label">
              <span class="has-text-danger">*</span>E-mail
            </label>
            <input
              class="input"
              v-model="user.email.value"
              type="email"
              maxlength="60"
              placeholder="Informe seu e-mail (EX: exemplo@ex.com)."
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
              v-if="isMobile"
            />
            <template v-if="!isMobile">
              <label @click="openCalendar = !openCalendar;">
                <TheMask
                  class="input"
                  v-model="user.date.value"
                  type="text"
                  placeholder="dd/mm/yyyy"
                  :mask="['##/##/####']"
                  @input="openCalendar = false"
                  v-bind:class="{'is-danger': user.date.validator.isInvalid}"
                />
              </label>
              <Datepicker
                :inputClass="{'d-none': true}"
                :disabledDate="disableDate"
                :defaultValue="moment().subtract(18, 'years')"
                v-model="user.date.value"
                format="DD/MM/YYYY"
                :open="openCalendar"
                :appendToBody="true"
                value-type="format"
                @input="openCalendar = false"
                placeholder="dd/mm/yyyy"
              />
            </template>
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
              <input type="radio" name="gender" value="M" v-model="user.gender" />
              <span class="margin-left-1">masculino</span>
            </label>
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="F" v-model="user.gender" />
              <span class="margin-left-1">feminino</span>
            </label>
            <label class="radio flex align-items-center">
              <input type="radio" name="gender" value="O" v-model="user.gender" />
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
      </template>
      <footer>
        <a class="button is-info is-fullwidth" @click="confirm()">Salvar</a>
      </footer>
    </section>
    <section class="random-number" v-if="showNumber">
      <header class="flex justify-between aling-items-center margin-bottom-1">
        <div class="flex align-item-center">
          <span class="title">Parabéns</span>
        </div>
        <a class="font-25" @click="handleModal()">
          <i class="fa fa-times"></i>
        </a>
      </header>
      <div class="field">
        <strong>Sua participação no sorteio está confirmada e seu acesso a plataforma Cresça Play está liberado :)</strong>
      </div>
      <div class="field">
        <strong>Agora aproveite e dê um play no seu conhecimento.</strong>
      </div>
      <div class="field">
        <strong>Veja seu(s) número(s) da sorte.</strong>
      </div>
      <div class="field" v-for="item in userToSend.vouchers" :key="item.numeroSerie">
        <strong>{{item.numeroSerie}}</strong>
      </div>
      <footer>
        <a class="button is-info is-fullwidth" @click="redirectTo(crescaURL)">Acesse o Cresça Play</a>
      </footer>
    </section>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapState } from "vuex";
import _ from "lodash";
import services from "@/store/services";
import { formValidator } from "@/utils";
import { TheMask } from "vue-the-mask";
import Datepicker from "vue2-datepicker";
import moment from "moment";
import config from "@/config.json";
let mockId = 1;

export default {
  components: {
    Modal,
    TheMask,
    Datepicker
  },
  computed: {
    ...mapState({
      menuItem: state => state.menuItem,
      crescaURL: state => state.crescaURL,
      selectedUser: state => state.Home.selectedUser,
      isSuccess: state => state.Home.isSuccess,
      invalidVouchers: state => state.Home.invalidVouchers,
      invalidEmail: state => state.Home.invalidEmail
    })
  },
  watch: {
    menuItem(value) {
      if (value === "register") this.handleModal();
    },
    selectedUser(value) {
      this.userToSend = value;
    },
    invalidVouchers(value) {
      this.user.passports.forEach(passport => {
        passport.validator.isInvalid = !!value.find(
          invalid => invalid.voucher == passport.value
        );
        passport.validator.message = "passaporte inválido.";
      });
    },
    invalidEmail(value) {
      this.user.email.validator.isInvalid =
        value.email == this.user.email.value;
      this.user.email.validator.message = value.message.toLowerCase();
    }
  },
  data() {
    return {
      moment,
      openCalendar: false,
      showModal: false,
      showLoginCpf: true,
      showPassports: false,
      showUserForm: false,
      showPassword: false,
      showConfirmDatas: false,
      showNumber: false,
      isMobile: false,
      states: [],
      cities: [],
      userToSend: {},
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
        gender: "O",
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
          value: moment().subtract(18, "years"),
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
      }
    };
  },
  methods: {
    alert() {
      alert("FOI");
    },
    handleModal() {
      this.showModal = !this.showModal;
      this.$store.dispatch("setSelectedMenuItem", "");
      this.reset();
    },
    addInputField() {
      if (this.user.passports.length < 5) {
        this.user.passports.push({
          id: mockId++,
          value: null,
          validator: { isInvalid: false, message: "" }
        });
      }
    },
    removeInputField(passport) {
      if (this.user.passports.length > 1)
        this.user.passports.splice(this.user.passports.indexOf(passport), 1);
      else this.user.passports[0].value = "";
    },
    removePassportOnListBadge(item) {
      if (this.user.passports.length > 1 && this.user.numbers.length > 1) {
        let passport = this.user.passports.find(
          passport => item.passport === passport.value
        );
        let number = this.user.numbers.find(num => item.number === num.number);
        this.user.passports.splice(this.user.passports.indexOf(passport), 1);
        this.user.numbers.splice(this.user.numbers.indexOf(number), 1);
      }
    },
    checkConditionsToValidator(
      requiredCondition = null,
      lengthCondition = null,
      emailCondition = null,
      nameCondition = null,
      cpfCondition = null,
      dateCondition = null,
      adulthoodCondition = null
    ) {
      return {
        isInvalid:
          (requiredCondition && requiredCondition !== "isValid") ||
          (lengthCondition && lengthCondition !== "isValid") ||
          (emailCondition && emailCondition !== "isValid") ||
          (nameCondition && nameCondition !== "isValid") ||
          (cpfCondition && cpfCondition !== "isValid") ||
          (dateCondition && dateCondition !== "isValid") ||
          (adulthoodCondition && adulthoodCondition !== "isValid"),
        message:
          requiredCondition === "isValid"
            ? lengthCondition === "isValid"
              ? emailCondition === "isValid"
                ? nameCondition === "isValid"
                  ? cpfCondition === "isValid"
                    ? dateCondition === "isValid"
                      ? adulthoodCondition
                      : dateCondition
                    : cpfCondition
                  : nameCondition
                : emailCondition
              : lengthCondition
            : requiredCondition
      };
    },
    async loginCpf() {
      let isValidArray = [];
      let requiredCondition = "";
      let lengthCondition = "";
      let cpfCondition = "";
      let { value, validator } = this.user.cpf;
      requiredCondition = formValidator(value, "required", "informe seu CPF.");
      lengthCondition = formValidator(
        { value, qtd: 11 },
        "length",
        "insira no mínimo 11 números."
      );
      cpfCondition = formValidator(value, "cpf", "CPF inválido.");
      validator = this.checkConditionsToValidator(
        requiredCondition,
        lengthCondition,
        "isValid",
        "isValid",
        cpfCondition
      );
      this.user.cpf.validator = validator;
      if (!this.user.cpf.validator.isInvalid) {
        await this.$store.dispatch("getUserByCPF", this.user.cpf.value);
        this.showLoginCpf = false;
        this.showPassports = true;
      }
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
        if (!this.userToSend.idUsuario) {
          this.showUserForm = true;
        } else {
          this.user.name.value = this.userToSend.nome;
          this.showConfirmDatas = true;
        }
        this.showPassports = false;
      }
    },
    saveUser() {
      if (this.validateUserForm()) {
        this.showUserForm = false;
        this.showPassword = true;
      }
    },
    savePassword() {
      let isValidArray = [];
      let requiredCondition = "";
      let lengthCondition = "";
      let propsArray = [
        { prop: "password", message: "informe sua senha." },
        { prop: "confirmPassword", message: "confirme sua senha." }
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
            "insira no mínimo 8 caracteres."
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
    async confirm() {
      this.userToSend.vouchers = this.user.passports.map(item => item.value);
      if (this.userToSend.idUsuario > 0)
        await this.$store.dispatch("editUser", this.userToSend);
      else if (this.validateUserForm()) {
        this.userToSend.nome = this.user.name.value;
        this.userToSend.login = this.userToSend.cpf = this.user.cpf.value;
        this.userToSend.email = this.user.email.value;
        this.userToSend.senha = this.user.password.value;
        this.userToSend.sexo = this.user.gender;
        this.userToSend.dataNascimento = this.user.date.value;
        this.userToSend.telefoneCelular = this.user.phone.value;
        this.userToSend.uf = this.user.state.value.sigla;
        this.userToSend.cidade = this.user.city.value;
        await this.$store.dispatch("createUser", this.userToSend);
      }
      if (this.isSuccess) {
        this.showNumber = true;
        this.showConfirmDatas = false;
      }
    },
    async getCitiesByState(state) {
      let response = await services.get(
        `${config.IBGE_API_URL}estados/${state.id}/municipios`
      );
      this.cities = _.orderBy(response.data, "nome");
    },
    reset() {
      this.showLoginCpf = true;
      this.showPassports = false;
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
    },
    validateUserForm() {
      let isValidArray = [];
      let requiredCondition = "";
      let emailCondition = "";
      let nameCondition = "";
      let dateCondition = "";
      let adulthoodCondition = "";
      let propsArray = [
        { prop: "phone", message: "seu celular ou telefone." },
        { prop: "state", message: "seu estado." },
        { prop: "city", message: "sua cidade." }
      ];
      if (!this.userToSend.idUsuario) {
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
          "informe seu e-mail."
        );
        emailCondition = formValidator(
          this.user.email.value,
          "email",
          "insira um e-mail válido."
        );
        this.user.email.validator = this.checkConditionsToValidator(
          requiredCondition,
          "isValid",
          emailCondition
        );
        if (this.user.email.validator.isInvalid) {
          isValidArray.push(!this.user.email.validator.isInvalid);
        }
        requiredCondition = formValidator(
          this.user.date.value,
          "required",
          "informe sua data de nascimento."
        );
        dateCondition = formValidator(
          this.user.date.value,
          "date",
          "data de nascimento inválida."
        );
        adulthoodCondition = formValidator(
          this.user.date.value,
          "adulthood",
          "você precisa ter mais de 18 anos para criar seu cadastro."
        );
        this.user.date.validator = this.checkConditionsToValidator(
          requiredCondition,
          "isValid",
          "isValid",
          "isValid",
          "isValid",
          dateCondition,
          adulthoodCondition
        );
        if (this.user.date.validator.isInvalid)
          isValidArray.push(!this.user.date.validator.isInvalid);
      }
      requiredCondition = formValidator(
        this.user.name.value,
        "required",
        "informe seu nome."
      );
      nameCondition = formValidator(
        this.user.name.value,
        "name",
        "insira um nome e um sobrenome."
      );
      this.user.name.validator = this.checkConditionsToValidator(
        requiredCondition,
        "isValid",
        "isValid",
        nameCondition
      );
      if (this.user.name.validator.isInvalid) {
        isValidArray.push(!this.user.name.validator.isInvalid);
      }

      return isValidArray.filter(value => !value).length === 0;
    },
    disableDate(date) {
      return date > moment().subtract(18, "years");
    },
    redirectTo(url) {
      window.location.href = url;
    }
  },
  async mounted() {
    let response = await services.get(`${config.IBGE_API_URL}estados`);
    this.states = _.orderBy(response.data, "nome");
    this.isMobile = screen.width < 1300;
  }
};
</script>

<style lang="scss">
.list-badge {
  padding: 0.5em;
  background: #ece8e8;
  margin-bottom: 1em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 1.5rem !important;
}
.mx-calendar-header-label {
  font-size: 14px;
  border: 1px solid;
  padding: 0.5em 1em;
  cursor: pointer;
}
.mx-datepicker {
  position: absolute !important;
  left: 0;
}
.mx-icon-calendar {
  display: none;
}
</style>