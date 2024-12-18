import projectSchema from "../model/projectSchema.js"


export const getAllProjects = async(req, res) =>{
    try {
        const response = await projectSchema.find();
        return res.status(200).json({message:"successfully fetched all projects", response});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}