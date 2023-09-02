const express = require("express");
const formControllers = require("../controllers/");

const router = express.Router();

router.route("/form").post(formControllers.formdata);
router.route("/form/:id").get(formControllers.getFormDataById).put(formControllers.updateUserDataById)
router.route("/sendmail").post(formControllers.complete)

module.exports = router;
