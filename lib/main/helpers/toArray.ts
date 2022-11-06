export const toArray = (iterator) =>
  new Promise((resolve, reject) => {
    iterator.toArray((err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
