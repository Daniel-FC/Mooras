export function tagsStore() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tag: 'Detran',
        tag: 'Fam',
        tag: 'Famd',
        tag: 'Famígla',
        tag: 'Lanchonete',
        tag: 'Salão Central',
      });
    }, 2000);
  });
}
