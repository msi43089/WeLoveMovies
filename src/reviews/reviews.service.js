const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .first();
}

function destroy(reviewId) {
    return knex("reviews")
        .where({"review_id": reviewId})
        .del();
}

function readCritic(criticId) {
    return knex("critics")
        .select("*")
        .where({critic_id: criticId})
        .first();
}
  
function update(updatedReview){
    return knex("reviews as r")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview)
        .then(() => {
            return knex("reviews")
                .select("*")
                .where({ review_id: updatedReview.review_id})
                .first();
        })
}
    

module.exports = {
    read,
    destroy,
    update,
    readCritic
};