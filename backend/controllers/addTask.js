import projectSchema from "../model/projectSchema.js";
import taskSchema from "../model/taskSchema.js";

export const addTasks = async (req, res) => {
    try {
        const { id: projectId } = req.query;
        const tasks = req.body;
        for (let task of tasks) {
            if (!task.taskName || !task.description) {
                return res.status(400).json({ message: "Each task must have a taskName and description" });
            }
        }

        const responses = await Promise.all(
            tasks.map(task => taskSchema.create({ ...task, project: projectId }))
        );

        const taskIds = responses.map(response => response._id);

        await projectSchema.findByIdAndUpdate(projectId, {
          $push: { tasks: { $each: taskIds } },
        });

        res.status(200).json({ message: "Tasks added successfully", responses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
