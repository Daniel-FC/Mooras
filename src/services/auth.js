export function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dh2ur328uf8hgiejgoew9i23',
        user: {
          name: 'Daniel',
          email: 'daniel@gmail.com',
        },
      });
    }, 2000);
  });
}