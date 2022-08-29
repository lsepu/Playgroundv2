const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/usuario");
const usuario = require("../models/usuario");


const usuariosGet = (req = request, res = response) => {
  //const { q, nombre = "No name", apikey, page = 1, limit } = req.query;


  const { limit = 5, since = 0 } = req.query;
  const { query } = { state: true};

  // const users = await User.find(query)
  //       .skip( Number(since))
  //       .limit(Number(limit));

  // const total = await User.countDocuments(query);

  const [ total, users] = await Promise.all([
    User.count(query),
    User.find(query)
          .skip(Number( since ))
          .limit(Number( limit))
  ])

  res.json({
    total,
    users
  });
};

const usuariosPost = async (req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //encriptar password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  //guardar en bdd
  await user.save();

  res.json({
    msg: "post API - usuariosPost",
    user
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  //TODO validar contra bdd
  if ( password ){
      //encriptar password
      const salt = bcryptjs.genSaltSync(10);
      rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate( id, rest);

  res.json({
    msg: "put API - usuariosPut",
    user
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch"
  });
};

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  //fisicamente se borra
  //const user = await User.findByIdAndDelete( id );

  const user = await User.findByIdAndUpdate(id, {state: false});

  res.json({user});
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
};
