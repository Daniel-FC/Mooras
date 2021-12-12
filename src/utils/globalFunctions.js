import React from 'react';

function translate(text) {
  let translation;

  if(text == 'Error: The email address is badly formatted.'){
    translation = "O endereço de e-mail está formatado incorretamente";
  } 
  else if(text == 'Error: The email address is already in use by another account.'){
    translation = "O endereço de e-mail já está sendo usado";
  } 
  else if(text == 'Error: Password should be at least 6 characters'){
    translation = "A senha deve ter pelo menos 6 caracteres";
  } 
  else {
    translation = "E-mail ou senha inválido(s)";
  }

  return translation;
}

function sortItens(item, mode) {
  if(item != null) {
    if(mode == 0){
      item.sort(function (a, b){
        if(a.name > b.name){return 1;}
        if(a.name < b.name){return -1;}
        return 0;
      });
    }
    if(mode == 1){
      item.sort(function (a, b){
        if(a.name < b.name){return 1;}
        if(a.name > b.name){return -1;}
        return 0;
      });
    }
    if(mode == 2){
      item.sort(function (a, b){
        if(a.value < b.value){return 1;}
        if(a.value > b.value){return -1;}
        return 0;
      });
    }
    if(mode == 3){
      item.sort(function (a, b){
        if(a.value > b.value){return 1;}
        if(a.value < b.value){return -1;}
        return 0;
      });
    }
    return item;
  } else {
    return [];
  }
}

function searchItens(itens, text) {
  let retorno = [];
  for(const i in itens){
    if(text == itens[i].name.substr(0, text.length)){
      retorno.push(itens[i]);
    }
  }

  return retorno;
}

function filterItensByClients(clientList, filterSituation, filterTags) {
  let tempClients = [];
  if (filterSituation == 0) {
    if(filterTags != 0) {
      for(let i in clientList) {
        if(filterTags.indexOf(clientList[i].tag) != -1){
          tempClients.push(clientList[i]);
        }   
      }
    } else {
      tempClients = clientList.slice();
    }
  } else if (filterSituation == 2) {
    if(filterTags != 0) {
      for(let i in clientList) {
        if(filterTags.indexOf(clientList[i].tag) != -1 && clientList[i].value > 0){
          tempClients.push(clientList[i]);
        }
      }
    } else {
      for(let i in clientList) {
        if(clientList[i].value > 0){
          tempClients.push(clientList[i]);
        }
      }     
    }
  } else {
    if(filterTags != 0) {
      for(let i in clientList) {
        if(filterTags.indexOf(clientList[i].tag) != -1 && clientList[i].value == 0){
          tempClients.push(clientList[i]);
        }
      }
    } else {
      for(let i in clientList) {
        if(clientList[i].value == 0){
          tempClients.push(clientList[i]);
        }
      }     
    }      
  }

  return tempClients;
}

function filterItensByProducts(productList, filterSituation, filterCategorys) {
  let tempProducts = [];
  if (filterSituation == 0) {
    if(filterCategorys != 0) {
      for(let i in productList) {
        if(filterCategorys.indexOf(productList[i].category) != -1){
          tempProducts.push(productList[i]);
        }   
      }
    } else {
      tempProducts = productList.slice();
    }
  } else if (filterSituation == 1) {
    if(filterCategorys != 0) {
      for(let i in productList) {
        if(filterCategorys.indexOf(productList[i].category) != -1 && productList[i].quantity > 0){
          tempProducts.push(productList[i]);
        }
      }
    } else {
      for(let i in productList) {
        if(productList[i].quantity > 0){
          tempProducts.push(productList[i]);
        }
      }     
    }
  } else {
    if(filterCategorys != 0) {
      for(let i in productList) {
        if(filterCategorys.indexOf(productList[i].category) != -1 && productList[i].quantity == 0){
          tempProducts.push(productList[i]);
        }
      }
    } else {
      for(let i in productList) {
        if(productList[i].quantity == 0){
          tempProducts.push(productList[i]);
        }
      }     
    }      
  }

  return tempProducts;
}

function validateDate(date, hasYear) {
  let mensagem = "";
  let dateFormat = date.split("/");

  if(dateFormat.length != 2 && !hasYear) {
    mensagem = "Data mal formatada";
  } else if(dateFormat.length != 3 && hasYear) {
    mensagem = "Informe o ano de nascimento";
  } else {
    let date = new Date();
    if(dateFormat[0] < 1 || dateFormat[0] > 31) {
      mensagem = "Data mal formatada";
    } else if(dateFormat[0] == 31 && (dateFormat[1] == 2 || dateFormat[1] == 4 || dateFormat[1] == 6 || dateFormat[1] == 9 || dateFormat[1] == 11)) {
      mensagem = "Esse mês não possui 31 dias";
    } else if(dateFormat[0] > 28 && dateFormat[1] == 2) {
      if(dateFormat[0] == 30) {
        mensagem = "Esse mês não possui 30 dias";
      }
      if(dateFormat[0] == 29 && dateFormat[2]%4 != 0) {
        mensagem = "Esse ano não é bissexto";
      }
    } else if(dateFormat[1] < 1 || dateFormat[1] > 12) {
      mensagem = "Data mal formatada";
    } else if(hasYear && (dateFormat[2] < 1900 || dateFormat[2] > date.getFullYear())) {
      mensagem = "Revise o ano de nascimento do cliente ou desmarque a opção";
    }
  }

  return mensagem;
}

export { translate, sortItens, searchItens, filterItensByClients, filterItensByProducts, validateDate };
