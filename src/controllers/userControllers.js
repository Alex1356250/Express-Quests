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
  res.json(users);
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
