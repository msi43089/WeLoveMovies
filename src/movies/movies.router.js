const router = require("express").Router();
const controller = require("./movies.controller");
//need to add method not allowed



router.route("/")
    .get(controller.list)

router.route("/:movieId")
    .get(controller.read)

router.route("/:movieId/theaters")
    .get(controller.readTheater)

router.route("/:movieId/reviews")
    .get(controller.readReview)

module.exports = router