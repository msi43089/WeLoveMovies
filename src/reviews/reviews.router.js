const controller = require("./review.controller");
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId")
    .delete(controller.delete)
    .put(controller.update)
    .all(methodNotAllowed);

module.exports = router