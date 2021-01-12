function maskCep(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  return value;
}

function maskPhone(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

function maskCurrency(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}

function maskBirth(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1t$2");
  value = value.replace(/^(\w{5})(\d)/, "$1t$2");
  value = value.replace("t", "/");
  value = value.replace("t", "/");
  return value;
}

function maskAccentuation(value) {
  value = value.toUpperCase();
  value = value.replace(/[ÀÁÂÃÄÅ]/, "A");
  value = value.replace(/[ÈÉÊË]/, "E");
  value = value.replace(/[ÌÍÎÏ]/, "I");
  value = value.replace(/[ÒÓÔÕÖ]/, "O");
  value = value.replace(/[ÙÚÛÜ]/, "U");
  value = value.replace(/[Ç]/, "C");
  return value;
}

export { maskCep, maskPhone, maskCurrency, maskBirth, maskAccentuation };