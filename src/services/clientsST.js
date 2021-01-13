export function clientsStore() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        client: {
          key: 'a', 
          name: 'Angelica', 
          value: '50,00', 
          tag: 'Salão Central', 
          phone: '(84) 9 9876-5432', 
          adress: 'aaa', 
          birth: '01/01/2000',
        },
        client: {
          key: 'b',
          name: 'Bernado',
          value: '21,50',
          tag: 'Salão Central',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
        client: {
          key: 'c',
          name: 'Calorta',
          value: '88,00',
          tag: 'Detran',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
        client: {
          key: 'd',
          name: 'Daniel',
          value: '0,00',
          tag: 'Detran, Família',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
        client: {
          key: 'e',
          name: 'Eugênio',
          value: '999,00',
          tag: 'Lanchonete',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
        client: {
          key: 'f',
          name: 'Fatima',
          value: '60,00',
          tag: 'Família',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
        client: {
          key: 'g',
          name: 'Gilvan',
          value: '0,00',
          tag: 'Família',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
        client: {
          key: 'h',
          name: 'Hosana',
          value: '0,00',
          tag: 'Família',
          phone: '(84) 9 9876-5432',
          adress:'aaa',
          birth: '01/01/2000',
        },
      });
    }, 2000);
  });
}
