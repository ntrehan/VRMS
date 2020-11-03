const express = require("express");
const router = express.Router();

const { ProjectController } = require('../controllers');

// The base is /api/projects
router.get('/', ProjectController.project_list);

router.post('/', ProjectController.create);

router.get('/:ProjectId', ProjectController.project_by_id);

router.patch('/:ProjectId', ProjectController.update);

// Delete Project by id with POST.
router.delete('/:ProjectId', ProjectController.destroy);

// Display list of Project Event with GET.
router.get('/:ProjectId/upcomingevents', ProjectController.event_list);


module.exports = router;
