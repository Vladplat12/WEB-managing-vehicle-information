const Router = require("express");
const router = new Router();
const carController = require("../controllers/carController");
const checkRole = require("../middleware/checkRoleMiddle");

router.post("/", checkRole("ADMIN"), carController.create); //checkRole("ADMIN"),
router.get("/", carController.getAll);
router.get("/:id", carController.getOne);

module.exports = router;
