const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  update: updateProduct,
  destroyProduct,
} = require("../../database/productRepository");

const getProducts = async (ctx) => {
  try {
    let limit = ctx.query["limit"];
    let sort = ctx.query["sort"];
    let fields = ctx.query["fields"];
    const products = getAllProducts(limit, sort, fields);
    ctx.body = {
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
};

const getProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }
    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

const save = (async = (ctx) => {
  try {
    const postData = ctx.request.body;
    const currentDate = new Date();
    console.log(currentDate);
    const newProduct = { ...postData, createdAt: currentDate };
    addProduct(newProduct);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
});

const update = async (ctx) => {
  try {
    const updateData = ctx.request.body;
    const productId = ctx.params.id;
    // console.log(productId);
    updateProduct(productId, updateData);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

const destroy = (ctx) => {
  try {
    const productId = ctx.params.id;
    destroyProduct(productId);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  save,
  update,
  destroy,
};
