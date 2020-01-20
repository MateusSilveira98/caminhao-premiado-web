<template>
  <Modal :showModal="showModal" @close="handleModal()">
    <section class="login" v-if="showLoginCpf">
      <header class="flex justify-between">
        <span class="title">Login com seu CPF</span>
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
        <a class="button is-fullwidth is-info" @click="loginCpf()">Confirmar</a>
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
          <a class="margin-right-1 font-20" @click="showPassword = true; showConfirmDatas = false;">
            <i class="fa fa-arrow-left"></i>
          </a>
          <span class="title">Confime seus dados</span>
        </div>
        <a class="font-25" @click="handleModal()">
          <i class="fa fa-times"></i>
        </a>
      </header>
      <div class="field">
        <label class="label">Passaporte(s)</label>
        <div class="list-badge" v-for="item in user.numbers" :key="item.number">
          <p>{{item.passport}}</p>
          <span
            class="has-text-danger"
            @click="removePassportOnListBadge(item)"
            v-if="user.passports.length > 1"
          >
            <i class="fa fa-trash"></i>
          </span>
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
      <div class="field" v-for="item in user.numbers" :key="item.number">
        <strong>{{item.number}}</strong>
      </div>
      <footer>
        <a class="button is-info is-fullwidth" @click="handleModal()">Acesse o Cresça Play</a>
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
let mockId = 1;

export default {
  components: {
    Modal,
    TheMask
  },
  computed: {
    ...mapState(["menuItem"])
  },
  watch: {
    menuItem(value) {
      if (value === "register") this.handleModal();
    }
  },
  data() {
    return {
      showModal: false,
      showLoginCpf: true,
      showPassports: false,
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
      }
    };
  },
  methods: {
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
    loginCpf() {
      let isValidArray = [];
      let requiredCondition = "";
      let lengthCondition = "";
      let { value, validator } = this.user.cpf;
      requiredCondition = formValidator(value, "required", "informe seu cpf.");
      lengthCondition = formValidator(
        { value, qtd: 11 },
        "length",
        "insira no mínimo 11 números."
      );
      validator = this.checkConditionsToValidator(
        requiredCondition,
        lengthCondition
      );
      this.user.cpf.validator = validator;
      if (!this.user.cpf.validator.isInvalid) {
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
        this.user.numbers = [];
        for (let index = 0; index < this.user.passports.length; index++) {
          this.user.numbers.push({
            number: Math.floor(Math.random() * 1000),
            passport: this.user.passports[index].value
          });
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
</style>