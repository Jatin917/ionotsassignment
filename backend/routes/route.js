import { Router } from 'express';
import { addProject } from '../controllers/addProject.js';
import { addTasks } from '../controllers/addTask.js';
import { getAllProjects } from '../controllers/viewAllProjects.js';
import { acceptProject } from '../controllers/acceptProject.js';
import { getAllAcceptedProjects } from '../controllers/viewAcceptedProject.js';
import { getProject } from '../controllers/getProject.js';

const router = Router();
router.post('/addproject', addProject);
router.post('/addtask', addTasks);
router.get("/projects/:id", getProject);
router.get("/projects", getAllProjects);
router.post("/acceptproject", acceptProject);
router.get("/acceptproject", getAllAcceptedProjects);

export default router;
