const { v4: uuidv4 } = require("uuid");

const UserModel = require("../models/user");

let users = [
  { id: 1, name: "Handoko Adji Pangestu", nim: "11217052" },
  { id: 2, name: "Rizkia Nur Safitri", nim: "11217021" },
];

module.exports = {
  index: (req, res) => {
    let search = {};

    if (req.query.search) {
      search = { name: { $regex: req.query.search } };
    }

    // Query Builder
    const query = UserModel.find(search);
    query.select("name _id");
    query.exec((err, users) => {
      if (err) console.log(err);

      res.render("pages/user/index", { users });
    });

    // Cara biasa
    // UserModel.find(search, "name _id", (err, users) => {
    //   if (err) console.log(err);

    //   res.render("pages/user/index", { users });
    // });

    // res.render("pages/user/index", { users });

    // API
    // if (users.length > 0) {
    //   res.json({
    //     status: true,
    //     data: users,
    //     method: req.method,
    //     url: req.url,
    //   });
    // }

    // res.json({
    //   status: false,
    //   message: "Data empty",
    // });
  },

  create: (req, res) => {
    res.render("pages/user/create");
  },

  store: (req, res) => {
    UserModel.create(
      {
        ...req.body,
      },
      (err, user) => {
        if (err) console.log(err);

        console.log(user);
        res.redirect("/users");
      }
    );

    // users.push({
    //   id: uuidv4(),
    //   ...req.body,
    // });

    // res.redirect("/users");

    // API
    // users.push(req.body);
    // res.json({
    //   status: true,
    //   data: users,
    //   message: "Data successfully added",
    //   method: req.method,
    //   url: req.url,
    // });
  },

  show: (req, res) => {
    UserModel.findById(req.params.id, (err, user) => {
      if (err) console.log(err);

      res.render("pages/user/show", { user });
    });

    // const user = users.find((user) => user.id == req.params.id);
    // res.render("pages/user/show", { user });
  },

  update: (req, res) => {
    let id = req.params.id;
    users.filter((user) => {
      if (user.id == id) {
        user.id = id;
        user.name = req.body.name;
        user.nim = req.body.nim;

        return user;
      }
    });

    res.send({
      status: true,
      data: users,
      message: "Data successfully edited",
      method: req.method,
      url: req.url,
    });
  },

  delete: (req, res) => {
    let id = req.params.id;
    users = users.filter((user) => user.id != id);
    res.send({
      status: true,
      data: users,
      message: "Data successfully deleted",
      method: req.method,
      url: req.url,
    });
  },
};
