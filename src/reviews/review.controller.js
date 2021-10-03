const reviewService = require("./reviews.service")

async function reviewExists(req, res, next){
    const reviewId = Number(req.params.reviewId)
    const foundReview = await reviewService.findId(reviewId)
    if (foundReview){
        next()
    } else {
        next({status: 404, message: "Review cannot be found"})
    }
}

async function destroy(req,res,next){
    const reviewId = Number(req.params.reviewId)
    await reviewService.deleteReview(reviewId)
    res.sendStatus(204)
}

module.exports = {
    delete: [reviewExists, destroy]
}