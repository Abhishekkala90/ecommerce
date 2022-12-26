const express = require("express");
const expressApp = express();
const controller = require("../controller/auth.controller");
const router = express.Router();
//CORS--->CROSS ORIGIN
express.request((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type,Accept"
  );
  next();
});

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
module.exports = router;
