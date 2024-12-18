import projectSchema from "../model/projectSchema.js";
// import taskSchema from "../model/taskSchema.js";

export const addProject = async(req, res) =>{
    try {
        const projects = req.body;
        // const response = await projectSchema.create({title, description});
        for (let project of projects) {
            if (!project.title || !project.description) {
                return res.status(400).json({ message: "Each project must have a title and description" });
            }
        }

        const responses = await Promise.all(
            projects.map(project => projectSchema.create(project ))
        );
        res.status(200).json({message:"Project added successfully", responses});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}