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
const formValidator = (value, rule, message) => {
  const cpfValidator = require('validar-cpf');
  const moment = require('moment');
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
        // const regex = /^[A-Za-z\u00C0-\u00FFçÇ]{2,30}$/;
        let string = payload.split(' ');
        let charactersArray = string.filter(item => item.length >= 2);
        return !(string.length > 1 && charactersArray.length > 1);
      },
      message
    },
    {
      name: 'date',
      rule: (payload) => {
        const date = moment(payload, 'DD/MM/YYYY');
        return !date.isValid();
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
  formValidator
}
