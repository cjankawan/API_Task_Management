const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const validate = require("../middlewares/validate");
const {
  taskSchema,
  updateStatusSchema,
} = require("../validation/taskValidation");

router.post("/", validate(taskSchema), taskController.createTask);
router.put("/:id", validate(taskSchema), taskController.updateTask);
router.patch(
  "/:id/status",
  validate(updateStatusSchema),
  taskController.updateTaskStatus,
);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
