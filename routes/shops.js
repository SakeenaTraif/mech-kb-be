const express = require("express");
const passport = require("passport");
const controller = require("../controllers/shops");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shopFound = await controller.fetchShop(shopId, next);
  if (shopFound) {
    req.shop = shopFound;
    next();
  } else {
    const error = new Error("Shop Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("", controller.shopList);
router.post("/",
passport.authenticate("jwt", { session: false }),
 upload.single("image"), 
 controller.shopCreate);

router.get("/:shopId", controller.shopDetail);
router.put("/:shopId", upload.single("image"), controller.shopUpdate);
router.delete("/:shopId", controller.shopDelete);

router.post("/:shopId/products",
passport.authenticate("jwt", { session: false }),
upload.single("image"), 
controller.productCreate);


module.exports = router;
