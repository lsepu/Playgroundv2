const { Router } = require("express");
const { usersGet, userPost } = require("../controllers/user");

const router = Router;

router.get("/", usersGet);
router.post("/", userPost); 
router.put("/:id", userPut);

module.exports = router;
