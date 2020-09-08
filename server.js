const express = require("express");
const session = require("express-session");
const path = require("path")
const app = express();
const mysql = require("mysql");
require('dotenv').config()
const db = require("./models")
// const cors = require("cors")

// Serve static assets
app.use(express.static(path.join(__dirname, "./client/build")));

//jawsDB
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: process.env.MYSQL_PASS,
        database: 'carFacts'
    });
}

// app.use(cors());
// app.options('*', cors())
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
// });

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  app.post()
const routes = require("./routes");
app.use(routes);

// Catch all Last to Load
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./client/build/index.html")))

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});