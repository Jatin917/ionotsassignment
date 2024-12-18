import acceptedProjectSchema from "../model/acceptedProjectSchema.js";
import projectSchema from "../model/projectSchema.js";


export const acceptProject = async (req, res) =>{
    try {
        const {id:projectId} = req.query;
        const project = await projectSchema.findById(projectId).populate("project").populate("tasks");
        if(!project){
            return res.status(401).json({message:"error finding that project"});
        }
        const tasks = project.tasks.map(task => ({
            task: task._id,
        }));
        const response = await acceptedProjectSchema.create({project:project._id, tasks});
        if(!response){
            return res.status(401).json({message:"error accepting the project"});
        }
        return res.status(200).json({message:"successfully accepted the project"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}