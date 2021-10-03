const knex = require("../db/connection")

function findId(reviewId){
    return knex("reviews")
        .select("review_id")
        .where({"review_id": reviewId})
}

function deleteReview(reviewId) {
    return knex("reviews")
        .where({"review_id": reviewId})
        .del()
}

module.exports = {
    findId,
    deleteReview
    
}