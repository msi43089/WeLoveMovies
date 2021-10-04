const controller = require("./review.controller");
const router = require("express").Router();

router.route("/:reviewId")
    .delete(controller.delete)
    .put(controller.update)

module.exports = router