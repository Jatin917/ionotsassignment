import projectSchema from "../model/projectSchema.js";
// import taskSchema from "../model/taskSchema.js";

export const addProject = async(req, res) =>{
    try {
        const {title, description } = req.body;
        const response = await projectSchema.create({title, description});
        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" , response});
        }
        res.status(200).json({message:"Project added successfully", response});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}