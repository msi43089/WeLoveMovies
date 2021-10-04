const reviewService = require("./reviews.service")

async function reviewExists(req, res, next){
    const reviewId = Number(req.params.reviewId)
    const review = await reviewService.findId(reviewId)
    if (review){
        res.locals.review = review
        next()
    } else {
        next({status: 404, message: "Review cannot be found"})
    }
}

async function destroy(req, res, next){
    const { review } = res.locals
    await reviewService.deleteReview(review.review_id)
    res.sendStatus(204)
}

async function update(req, res, next){
    const updatedReview = { 
        ...res.locals.review,
        review_id: res.locals.review.review_id
    }
    const data = await reviewService.update(updatedReview)
    res.json({ data })
}

module.exports = {
    delete: [reviewExists, destroy],
    update: [reviewExists, update]
}