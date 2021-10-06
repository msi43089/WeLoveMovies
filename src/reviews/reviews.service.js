const knex = require("../db/connection")

function findId(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .first()
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

    }

module.exports = {
    findId,
    deleteReview,
    update
}