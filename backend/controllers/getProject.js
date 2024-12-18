import projectSchema from "../model/projectSchema.js";


export const getProject = async (req, res)=>{
    try {
        const { id } = req.params;
        const data = await projectSchema.findById(id).populate("tasks");
        if(!data){
            return res.status(401).json({message:"Error fetching the data of project", data});
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}