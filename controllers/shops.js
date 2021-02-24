const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shopFound = await Shop.findByPk(shopId);
    if (shopFound) return shopFound;
    else next({ message: "Shop does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  console.log(req.body);
  try {
    const shops = await Shop.findAll({
        attributes: req.body, 
        include: {model: Product,
        as: "products",
        attributes: ["id"] },
    });
    res.status(200).json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file)
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res, next) => {
  res.status(200).json(req.shop);
};

exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.shop.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
//   req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//   await req.product.update(req.body);
//   res.status(200).json(req.product);
// };

exports.shopDelete = async (req, res, next) => {
  await req.shop.destroy();
  res.status(204).end();
};

exports.productCreate = async (req, res, next) => {
  try {
    //From route params
    req.body.shopId = req.shop.id;
    if (req.file)
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
