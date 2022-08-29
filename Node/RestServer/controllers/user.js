const { response } = require("express");

const usersGet = (req, res = response) => {
    //get queryparams
    const {q, name = 'no name', apikey, page = 1, limit} = req.query;

    res.json({
        q,
        name,
        apikey,
        page,
        limit
    });
};

const userPost = (req, res = response) => {
  const body = req.body;

  res.json({
    body
  });
};

const userPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    id
  });
};

module.exports = {
  usersGet,
  userPost,
  userPut
};
