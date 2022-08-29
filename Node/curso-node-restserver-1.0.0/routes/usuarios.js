const { Router } = require("express");
const { check } = require("express-validator");


const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require("../controllers/usuarios");
const validateFields = require("../middlewares/validate-fields");
const {isRoleValid, emailExists, userExistsById }= require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom( userExistsById )
], usuariosPut);

router.post(
  "/",
  [
    check("name", "the name is required").not().isEmpty(),
    check("password", "the password is required and must be 6 letters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("email", "the email is not valid").isEmail(),
    check("email").custom(emailExists),
    check("role").custom( isRoleValid ),
    validateFields
  ],
  usuariosPost
);

router.delete("/:id",[
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
], usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
