import e from "express";
import acceptedProjectSchema from "../model/acceptedProjectSchema.js";


export const getAllAcceptedProjects = async(req, res) =>{
    try {
        const response = await acceptedProjectSchema.find();
        return res.status(200).json({message:"successfully fetched all projects", response});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}