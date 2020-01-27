const localstorage = {
  set: (label, obj) => {
    window.localStorage.setItem(label, JSON.stringify(obj));
  },
  get: (label) => {
    let string = window.localStorage.getItem(label);
    return JSON.parse(string);
  },
  remove: (label) => {
    window.localStorage.removeItem(label);
  },
  clear: () => {
    window.localStorage.clear();
  }
}
const callback = (commit, response) => {
  if (response.type == 'success') {
    commit('LOADING');
    commit('SUCCESS_MESSAGE', { response });
    commit('PUSH_NOTIFICATION');
  } else {
    commit('LOADING');
    console.log('error', response)
    commit('FAIL_MESSAGE', { response });
    commit('PUSH_NOTIFICATION');
  }
}
const formValidator = (value, rule, message) => {
  const cpfValidator = require('validar-cpf');

  const rules = [
    {
      name: 'required',
      rule: (payload) => payload == '' || payload == null || payload == undefined,
      message
    },
    {
      name: 'length',
      rule: (payload) => payload && payload.value && payload.value.toString().length < payload.qtd,
      message
    },
    {
      name: 'email',
      rule: (payload) => {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return !regex.test(String(payload).toLowerCase());
      },
      message
    },
    {
      name: 'name',
      rule: (payload) => {
        const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,30}$/;
        return !regex.test(String(payload));
      },
      message
    },
    {
      name: 'date',
      rule: (payload) => {
        const condition = !!Date.parse(payload);
        return !condition;
      },
      message
    },
    {
      name: 'cpf',
      rule: (payload) => !cpfValidator(payload),
      message
    }
  ];
  let selectedRule = rules.find(r => rule === r.name);
  return selectedRule.rule(value) ? selectedRule.message : 'isValid'
}
module.exports = {
  localstorage,
  callback,
  formValidator
}
