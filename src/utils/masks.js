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

function maskDate(value, year) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1t$2");
  value = value.replace(/^(\w{5})(\d)/, "$1t$2");
  value = value.replace("t", "/");
  value = value.replace("t", "/");
  if(!year) {
    value = value.substring(0,5);
  }
  return value;
}

function maskQuantity(value) {
  value = value.replace(/[^\d]+/g,'');
  if(value.length === undefined || value.length == 0) {
    value = "";
  } else {
    value = parseInt(value);
    if(value <= 0) {
      value = 1;
    } else if(value >= 10000) {
      value = 9999;
    }
  }

  return value.toString();
}

export { maskPhone, maskCurrency, maskDate, maskQuantity };
