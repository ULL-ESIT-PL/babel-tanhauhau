let obj = new DefaultObject({
  getData: () => ({ key: "value" })
});

console.log(obj.getData()); // Debe devolver un DefaultObject en lugar del objeto normal
