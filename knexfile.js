const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgres://xbwvhzpf:vfgRJpbzVyln7g5XfWOZvczQGl40BHtR@fanny.db.elephantsql.com/xbwvhzpf",
} = process.env;

//url for tests commented out so that we can use real db
/*const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
} = process.env;
*/

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
