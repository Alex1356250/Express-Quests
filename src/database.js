require("dotenv").config();

const mysql = require("mysql2/promise");
const { errorMonitor } = require("supertest/lib/test");

const database = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const getMovies = (req, res) => {
    const id = req.params.id;

    database
        .query("select * from movies where id = ?", [id])
        .then(([movies]) => {
            if (movies[0] != null) {
                res.json(movies[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const getUsers = (req, res) => {
    const id = req.params.id;

    database
        .query("select * from users where id = ?", [id])
        .then(([users]) => {
            if (users[0] != null) {
                res.json(users[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
