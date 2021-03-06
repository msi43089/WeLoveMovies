const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next){
    const reviewId = Number(req.params.reviewId);
    const review = await reviewService.read(reviewId);
    if (review){
        res.locals.review = review
        next();
    } else {
        next({status: 404, message: "Review cannot be found"});
    }
}

async function destroy(req, res, next){
    const { review } = res.locals;
    await reviewService.destroy(review.review_id);
    res.sendStatus(204);
}

async function update(req, res) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
    const returnData = await reviewService.update(updatedReview);
    returnData.critic = await reviewService.readCritic(updatedReview.critic_id);
    res.json({ data: returnData });
  }
module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
};