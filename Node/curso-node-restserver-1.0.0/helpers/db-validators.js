const Role = require("../models/role");
const User = require("../models/usuario");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ rol: role });
  if (!roleExists) {
    throw new Error(`The role ${role} is not registered in the Database`);
  }
};

const emailExists = async ( email = "" ) =>{
    const emailFound = await User.findOne({ email });
    if (emailFound) {
        throw new Error(`The email ${email} already exists`);
    }
} 

const userExistsById = async(id) => {
    const userExists = await User.findById({ id });
    if (!userExists) {
        throw new Error(`The id doesn't exists ${id}`);
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById
} 