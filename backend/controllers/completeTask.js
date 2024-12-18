import projectSchema from "../model/projectSchema.js";
import taskSchema from "../model/taskSchema.js";

const completeTask = async(req, res) => {
    try {
        const {projectId, taskId} = req.query;
        const taskDetail = await taskSchema.findById(taskId);
        const projectDetail = await projectSchema.findById(projectId);
    } catch (error) {
        
    }
}