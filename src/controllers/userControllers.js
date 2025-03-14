const users = [
  {
    id: 1,
    title: "Clark Kent",
    identity: "Superman",
    year: "1968",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "Bruce Wayne",
    identity: "Batman",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Peter Parker",
    identity: "Spiderman",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (user != null) {
    res.json(user);
  } else {
    res.status(404).send("Not Found");
  }
};

module.exports = {
  getUsers,
  getUsersById,
};
