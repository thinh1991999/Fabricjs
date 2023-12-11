export const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const fakeCallApi = (time, func) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func());
    }, time);
  });
};

export const getImageBase64 = (file, func) => {
  var reader = new FileReader();
  reader.onload = function (event) {
    const src = event.target.result;
    func({
      id: guidGenerator(),
      src,
      dateCreated: Date.now(),
    });
  };
  reader.readAsDataURL(file);
};
