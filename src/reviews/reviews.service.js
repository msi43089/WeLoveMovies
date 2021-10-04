const knex = require("../db/connection")

function findId(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .first()
}

function readCritic(critic_Id){
    return knex("critics")
        .where({critic_Id})
        .first()
}

async function setCritic(review){
    review.critic = await readCritic(review.critic_id)
    return review
}

function deleteReview(reviewId) {
    return knex("reviews")
        .where({"review_id": reviewId})
        .del()
}

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({review_id: updatedReview.review_id})
        .update({score: updatedReview.score, content: updatedReview.content})
        .then(() => findId(updatedReview.review_id))
        .then(setCritic)
    }

module.exports = {
    findId,
    deleteReview,
    update
}