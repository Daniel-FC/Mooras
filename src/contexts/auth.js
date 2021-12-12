import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from "../config/firebaseconfig";

const AuthContext = createContext({ signed: false, userEmail: {} });

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const [transactionList, setTransactionList] = useState(null);
  const [nextTransactionId, setNextTransactionId] = useState(null);
  const [clientList, setClientList] = useState(null);
  const [nextClientId, setNextClientId] = useState(null);
  const [productList, setProductList] = useState(null);
  const [nextProductId, setNextProductId] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [tagList, setTagList] = useState(null);

  const database = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => { if (user) {} });
    async function loadStorageData() {
      const storageUserId = await AsyncStorage.getItem('@RNAuth:UserId');
      const storageUserName = await AsyncStorage.getItem('@RNAuth:UserName');
      const storageUserEmail = await AsyncStorage.getItem('@RNAuth:UserEmail');

      const storageTransactionList = await AsyncStorage.getItem('@RNAuth:TransactionList');
      const storageNextTransactionId = await AsyncStorage.getItem('@RNAuth:NextTransactionId');

      const storageClientList = await AsyncStorage.getItem('@RNAuth:ClientList');
      const storageNextClientId = await AsyncStorage.getItem('@RNAuth:NextClientId');
      const storageTagList = await AsyncStorage.getItem('@RNAuth:TagList');

      const storageProductList = await AsyncStorage.getItem('@RNAuth:ProductList');
      const storageNextProductId = await AsyncStorage.getItem('@RNAuth:NextProductId');
      const storageCategoryList = await AsyncStorage.getItem('@RNAuth:CategoryList');

      if (storageUserId && storageUserName && storageUserEmail) {
        setUserId(storageUserId);
        setUserName(storageUserName);
        setUserEmail(storageUserEmail);

        if(storageTransactionList){setTransactionList(JSON.parse(storageTransactionList));}
        if(storageNextTransactionId){setNextTransactionId(parseInt(storageNextTransactionId));}

        if(storageClientList){setClientList(JSON.parse(storageClientList));}
        if(storageNextClientId){setNextClientId(parseInt(storageNextClientId));}
        if(storageTagList){setTagList(JSON.parse(storageTagList));}

        if(storageProductList){setProductList(JSON.parse(storageProductList));}
        if(storageNextProductId){setNextProductId(parseInt(storageNextProductId));}
        if(storageCategoryList){setCategoryList(JSON.parse(storageCategoryList));}
        setLoading(false);
      } else if (!storageUserId || !storageUserName || !storageUserEmail) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, [userEmail]); 

  async function registerUser(name, email, password) {
    let user = null;
    let errorRegister = await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      user = userCredential.user;
      user.updateProfile({displayName: name})
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      return(error);
    });

    if(errorRegister === undefined){
      try {
        await AsyncStorage.setItem('@RNAuth:UserId', user.uid);
        setUserId(user.uid);
        await AsyncStorage.setItem('@RNAuth:UserName', name);
        setUserName(name);
        await AsyncStorage.setItem('@RNAuth:UserEmail', user.email);
        setUserEmail(user.email);

        let docData = {name: []};
        let nextId = {nextId: 1};

        database.collection(user.uid).doc("Categorys").set(docData);
        await AsyncStorage.setItem('@RNAuth:CategoryList', JSON.stringify([]));
        setCategoryList([]);

        database.collection(user.uid).doc("Transactions").collection("dados").doc("1").set(docData);
        await AsyncStorage.setItem('@RNAuth:TransactionList', JSON.stringify([]));
        setTransactionList([]);

        database.collection(user.uid).doc("Transactions").set(nextId);
        await AsyncStorage.setItem('@RNAuth:NextTransactionId', nextId.nextId.toString());
        setNextTransactionId(nextId.nextId);

        database.collection(user.uid).doc("Clients").collection("dados").doc("1").set(docData);
        await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify([]));
        setClientList([]);

        database.collection(user.uid).doc("Clients").set(nextId);
        await AsyncStorage.setItem('@RNAuth:NextClientId', nextId.nextId.toString());
        setNextClientId(nextId.nextId);

        database.collection(user.uid).doc("Products").collection("dados").doc("1").set(docData);
        await AsyncStorage.setItem('@RNAuth:ProductList', JSON.stringify([]));
        setProductList([]);

        database.collection(user.uid).doc("Products").set(nextId);
        await AsyncStorage.setItem('@RNAuth:NextProductId', nextId.nextId.toString());
        setNextProductId(nextId.nextId);

        database.collection(user.uid).doc("Tags").set(docData);
        await AsyncStorage.setItem('@RNAuth:TagList', JSON.stringify([]));
        setTagList([]);
      }
      catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      }
    }
    return errorRegister;
  };

  async function signIn(email, password) {
    let user = null;
    let errorLogin = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      return(error);
    });

    if(errorLogin === undefined){
      try {
        await AsyncStorage.setItem('@RNAuth:UserId', user.uid);
        await AsyncStorage.setItem('@RNAuth:UserName', user.displayName);
        await AsyncStorage.setItem('@RNAuth:UserEmail', user.email);
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);

        database.collection(user.uid).onSnapshot((query)=>{
          const list = []
          query.forEach((doc)=>{
            list.push({...doc.data(), id: doc.id})
          })
          setCategoryList(list[0].name);
          setNextClientId(list[1].nextId);
          setNextProductId(list[2].nextId);
          setTagList(list[3].name);
          setNextTransactionId(list[4].nextId);
          synchronizeApp_Standard(list);
        })
        database.collection(user.uid).doc("Clients").collection("dados").onSnapshot((query)=>{
          const list = []
          query.forEach((doc)=>{
            list.push({...doc.data(), id: doc.id})
          })
          setClientList(list);
          synchronizeApp_Client(list);
        })
        database.collection(user.uid).doc("Products").collection("dados").onSnapshot((query)=>{
          const list = []
          query.forEach((doc)=>{
            list.push({...doc.data(), id: doc.id})
          })
          setProductList(list);
          synchronizeApp_Product(list);
        })
        database.collection(user.uid).doc("Transactions").collection("dados").onSnapshot((query)=>{
          const list = []
          query.forEach((doc)=>{
            list.push({...doc.data(), id: doc.id})
          })
          setTransactionList(list);
          synchronizeApp_Transaction(list);
        })    
      }
      catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      }
    }
    return errorLogin;
  }

  function signOut() {
    firebase.auth().signOut().then(() => {}).catch((error) => {});
    AsyncStorage.clear().then(() => {
      setUserName(null), setUserEmail(null), setUserId(null);
    });
  }

  async function synchronizeApp_Standard(list) {
    await AsyncStorage.setItem('@RNAuth:CategoryList', JSON.stringify(list[0].name));
    await AsyncStorage.setItem('@RNAuth:NextClientId', list[1].nextId.toString());
    await AsyncStorage.setItem('@RNAuth:NextProductId', list[2].nextId.toString());
    await AsyncStorage.setItem('@RNAuth:TagList', JSON.stringify(list[3].name));
    await AsyncStorage.setItem('@RNAuth:NextTransactionId', list[4].nextId.toString());
  }

  async function synchronizeApp_Transaction(list) {
    await AsyncStorage.setItem('@RNAuth:TransactionList', JSON.stringify(list));
    sortTransactions(list);
  }

  async function synchronizeApp_Client(list) {
    await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify(list));
  }

  async function synchronizeApp_Product(list) {
    await AsyncStorage.setItem('@RNAuth:ProductList', JSON.stringify(list));
  }

  async function synchronizeFirebase() {
    for(let transaction in transactionList) {
      database.collection(userId).doc("Transactions").collection("dados").doc(transactiontList[transaction].id.toString()).set({
        client: transactionList[transaction].client,
        products: transactionList[transaction].products,
        isSale: transactionList[transaction].isSale,
        value: transactionList[transaction].value,
        date: transactionList[transaction].date,
      });
    }
    database.collection(userId).doc("Transactions").set({
      nextId: nextTransactionId
    }) 
    for(let client in clientList) {
      database.collection(userId).doc("Clients").collection("dados").doc(clientList[client].id.toString()).set({
        name: clientList[client].name,
        value: clientList[client].value,
        sumValue: clientList[client].sumValue,
        address: clientList[client].address,
        birth: clientList[client].birth,
        phone: clientList[client].phone,
        tag: clientList[client].tag
      });
    }
    database.collection(userId).doc("Clients").set({
      nextId: nextClientId
    })     
    for(let product in productList) {
      database.collection(userId).doc("Products").collection("dados").doc(productList[product].id.toString()).set({
        name: productList[product].name,
        value: productList[product].value,
        quantity: productList[product].quantity,
        sumQuantity: productList[product].sumQuantity,
        category: productList[product].category,
        readjustment: productList[product].readjustment,
      });
    }
    database.collection(userId).doc("Products").set({
      nextId: nextProductId
    })
    database.collection(userId).doc("Tags").set({
      name: tagList
    })
    database.collection(userId).doc("Categorys").set({
      name: categoryList
    })
  }

  async function changeTransactionList(transactions, transaction, add) {
    let id = nextTransactionId + add;

    setTransactionList(transactions);
    await AsyncStorage.setItem('@RNAuth:TransactionList', JSON.stringify(transactions));
    database.collection(userId).doc("Transactions").collection("dados").doc(id.toString()).set({
      client: transaction.client,
      products: transaction.products,
      isSale: transaction.isSale,
      value: transaction.value,
      date: transaction.date,
    });

    setNextTransactionId(++id);
    await AsyncStorage.setItem('@RNAuth:NextTransactionId', id.toString());
    database.collection(userId).doc("Transactions").set({
      nextId: id
    })

    let clients = clientList.slice();
    for(let i in clientList) {
      if(parseInt(clientList[i].id) == parseInt(transaction.client)) {
        if(transaction.isSale) {
          clients[i].sumValue += transaction.value;
        } else {
          clients[i].sumValue -= transaction.value;
        }
      }
    }
    setClientList(clients);
    await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify(clients));
    for(let client in clients) {
      database.collection(userId).doc("Clients").collection("dados").doc(clients[client].id.toString()).set({
        name: clients[client].name,
        value: clients[client].value,
        sumValue: clients[client].sumValue,
        address: clients[client].address,
        birth: clients[client].birth,
        phone: clients[client].phone,
        tag: clients[client].tag
      });
    }

    sortTransactions(transactions);
  }

  async function deleteTransactionList(transactions, transaction, clients) {
    setTransactionList(transactions);
    await AsyncStorage.setItem('@RNAuth:TransactionList', JSON.stringify(transactions));
    database.collection(userId).doc("Transactions").collection("dados").doc(transaction.id.toString()).delete();

    setClientList(clients);
    await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify(clients));
    for(let client in clients) {
      database.collection(userId).doc("Clients").collection("dados").doc(clients[client].id.toString()).set({
        name: clients[client].name,
        value: clients[client].value,
        sumValue: clients[client].sumValue,
        address: clients[client].address,
        birth: clients[client].birth,
        phone: clients[client].phone,
        tag: clients[client].tag
      });
    }
  }

  async function changeClientList(clients, add) {
    let id = nextClientId;

    setClientList(clients);
    await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify(clients));
    for(let client in clients) {
      database.collection(userId).doc("Clients").collection("dados").doc(clients[client].id.toString()).set({
        name: clients[client].name,
        value: clients[client].value,
        sumValue: clients[client].sumValue,
        address: clients[client].address,
        birth: clients[client].birth,
        phone: clients[client].phone,
        tag: clients[client].tag
      });
    }
    if(add) {
      setNextClientId(++id);
      await AsyncStorage.setItem('@RNAuth:NextClientId', id.toString());
      database.collection(userId).doc("Clients").set({
        nextId: id
      })
    }
  }

  async function deleteClientList(clients, client) {
    setClientList(clients);
    await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify(clients));
    database.collection(userId).doc("Clients").collection("dados").doc(client.id.toString()).delete();
  }

  async function changeProductList(products, add) {
    let id = nextProductId;

    setProductList(products);
    await AsyncStorage.setItem('@RNAuth:ProductList', JSON.stringify(products));
    for(let product in products) {
      database.collection(userId).doc("Products").collection("dados").doc(products[product].id.toString()).set({
        name: products[product].name,
        value: products[product].value,
        quantity: products[product].quantity,
        sumQuantity: products[product].sumQuantity,
        category: products[product].category,
        readjustment: products[product].readjustment,
      });
    }
    if(add) {
      setNextProductId(++id);
      await AsyncStorage.setItem('@RNAuth:NextProductId', id.toString());
      database.collection(userId).doc("Products").set({
        nextId: id
      })
    }
  }

  async function deleteProductList(products, product) {
    console.log(products);
    setProductList(products);
    await AsyncStorage.setItem('@RNAuth:ProductList', JSON.stringify(products));
    database.collection(userId).doc("Products").collection("dados").doc(product.id.toString()).delete();
  }

  async function changeTagList(tags, oldTag, newTag) {
    setTagList(tags);
    await AsyncStorage.setItem('@RNAuth:TagList', JSON.stringify(tags));
    database.collection(userId).doc("Tags").set({
      name: tags
    })
    if(oldTag != null) {
      let clients = clientList.slice();
      for(let client in clientList){
        if(clientList[client].tag == oldTag) {
          if(newTag != null) {
            clients[client].tag = newTag;
          } else {
            clients[client].tag = "";
          }
        }
      }
      setClientList(clients);
      await AsyncStorage.setItem('@RNAuth:ClientList', JSON.stringify(clients));
      for(let client in clients) {
        database.collection(userId).doc("Clients").collection("dados").doc(clients[client].id.toString()).set({
          name: clients[client].name,
          value: clients[client].value,
          sumValue: clients[client].sumValue,
          address: clients[client].address,
          birth: clients[client].birth,
          phone: clients[client].phone,
          tag: clients[client].tag
        });
      }
    }
  }

  async function changeCategoryList(categorys, oldCategory, newCategory) {
    setCategoryList(categorys);
    await AsyncStorage.setItem('@RNAuth:CategoryList', JSON.stringify(categorys));
    database.collection(userId).doc("Categorys").set({
      name: categorys
    })

    if(oldCategory != null) {
      let products = productList.slice();
      for(let product in productList){
        if(productList[product].category == oldCategory) {
          if(newCategory != null) {
            products[product].category = newCategory;
          } else {
            products[product].category = "";
          }
        }
      }
      setProductList(products);
      await AsyncStorage.setItem('@RNAuth:ProductList', JSON.stringify(products));
      for(let product in products) {
        database.collection(userId).doc("Products").collection("dados").doc(products[product].id.toString()).set({
          name: products[product].name,
          value: products[product].value,
          quantity: products[product].quantity,
          sumQuantity: products[product].sumQuantity,
          category: products[product].category,
          readjustment: products[product].readjustment,
        });
      }
    }
  }

  async function sortTransactions(transactions) {
    let listaTransacoes = [];

    for(let i in transactions) {
      if(transactions[i].dateTemp == undefined && transactions[i].date != undefined) {
        let date = transactions[i].date;

        let a = date.split(" ");
        let b = a[0].split("-");
        let c = a[1].split(":");

        if(b[0].length == 1) {
          b[0] = "0" + b[0];
        }
        if(b[1].length == 1) {
          b[1] = "0" + b[1];
        }
        if(b[2].length == 1) {
          b[2] = "0" + b[2];
        }

        let d = b[2] + "-" + b[1] + "-" + b[0];

        let dateTemp  = new Date(d);
        dateTemp.setHours(c[0], c[1], c[2]);

        let transaction = {
          id: transactions[i].id,
          client: transactions[i].client,
          products: transactions[i].products,
          isSale: transactions[i].isSale,
          value: transactions[i].value,
          date: transactions[i].date,
          dateTemp: dateTemp,
        }
        listaTransacoes.push(transaction);
      } else {
        listaTransacoes.push(transactions[i]);
      }

      listaTransacoes.sort(function (a, b) {
        if(a.dateTemp > b.dateTemp) {
          return 1;
        } else if(a.dateTemp < b.dateTemp){
          return -1;
        } else {
          if(a.id > b.id){
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
    
    setTransactionList(listaTransacoes);
    await AsyncStorage.setItem('@RNAuth:TransactionList', JSON.stringify(listaTransacoes));
  }

  return (
    <AuthContext.Provider value={{ signed: !!userEmail, userEmail, userId, userName, transactionList, nextTransactionId, 
      changeTransactionList, deleteTransactionList, clientList, nextClientId, productList, nextProductId, tagList, categoryList, 
      registerUser, signIn, signOut, synchronizeFirebase, changeClientList, deleteClientList, changeProductList, deleteProductList, 
      changeTagList, changeCategoryList, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
