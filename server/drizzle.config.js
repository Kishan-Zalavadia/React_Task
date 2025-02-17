const dotenv = require('dotenv');
dotenv.config({path:'.env'});
const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./src/db/schema.js",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});