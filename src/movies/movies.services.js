const { orderBy, queryBuilder } = require("../db/connection");
const knex = require("../db/connection")


//showing in theaters regardless of the value of the query parameter object
function list(isShowing) {
    return knex("movies as m")
        .select("m.*")
        .modify((queryBuilder) => {
            if(isShowing) {
                queryBuilder
                    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                    .select("m.*", "mt.*")
                    .where({"mt.is_showing": true})
                    .distinct()
                    .orderBy("m.movie_id")
            }
    })
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .first()
}

function movieTheater(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select(
            "t.*",
            "mt.created_at",
            "mt.updated_at",
            "mt.is_showing",
            "m.movie_id"
            )
        .where({"m.movie_id": movieId})
        .where({"mt.is_showing": true})
}



 

module.exports = {
    list,
    read,
    movieTheater

}