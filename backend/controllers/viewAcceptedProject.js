import e from "express";
import acceptedProjectSchema from "../model/acceptedProjectSchema.js";


export const getAllAcceptedProjects = async(req, res) =>{
    try {
        const response = await acceptedProjectSchema.find().populate({
            path:'project',
            model:"Project",
            select:"title description"
        })
            .populate({
                path:'tasks.task',
                model:"Task",
                select:"taskname description isCompleted"
            });
        return res.status(200).json({message:"successfully fetched all projects", response});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}