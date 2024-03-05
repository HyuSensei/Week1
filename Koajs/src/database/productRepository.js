const fs = require("fs");
const { data: products } = require("./products.json");

const getAll = (limit, sort, fields) => {
  if (!limit) {
    limit = 10;
  }
  if (!sort) {
    sort = "asc";
  }

  let sortedProducts = [...products];
  // Kiểm tra và áp dụng sắp xếp nếu sort được chỉ định
  if (sort === "asc") {
    sortedProducts = sortedProducts
      .slice(0, limit)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "desc") {
    sortedProducts = sortedProducts
      .slice(0, limit)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  // Lọc ra chỉ các trường mong muốn nếu fields được chỉ định
  const result = sortedProducts.map((product) => {
    return fields ? pickFields(product, fields) : product;
  });

  return result;
};
const pickFields = (obj, fields) => {
  const result = {};
  fields.split(",").forEach((field) => {
    if (obj.hasOwnProperty(field)) {
      result[field] = obj[field];
    }
  });
  return result;
};

const getOne = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

const add = (data) => {
  const newProduct = [data, ...products];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: newProduct,
    })
  );
};

const update = (id, productUpdate) => {
  const indexProduct = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (indexProduct !== -1) {
    console.log(products[indexProduct]);
    products[indexProduct] = { ...products[indexProduct], ...productUpdate };
    fs.writeFileSync(
      "./src/database/products.json",
      JSON.stringify({
        data: products,
      })
    );
  }
};

const destroyProduct = (id) => {
  const newProduct = products.filter((product) => product.id !== parseInt(id));
  fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: newProduct,
    })
  );
};

module.exports = {
  getOne,
  getAll,
  add,
  update,
  destroyProduct,
};
