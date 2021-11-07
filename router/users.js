const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

https: router
  .route("/users")
  .get(userController.index)
  .post(userController.store);

https: router.get("/users/create", userController.create);

https: router.get("/users/:id", userController.show);

https: router.put("/users/:id");

https: router.delete("/users/:id");

module.exports = router;
