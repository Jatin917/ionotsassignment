import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from 'lucide-react';
import axios from 'axios';

const SingleProjectManagement = () => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        // Assuming you have an endpoint to fetch the current active project
        const projectResponse = await axios.get('http://localhost:5000/api/current-project');
        const project = projectResponse.data.project;
        setProject(project);

        // Fetch tasks for this project
        const tasksResponse = await axios.get(`http://localhost:5000/api/projects/${project._id}/tasks`);
        setTasks(tasksResponse.data.tasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/complete`);
      
      // Update tasks locally
      const updatedTasks = tasks.map(task => 
        task._id === taskId ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const calculateProjectProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto p-4 text-center">
        No active project found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full border border-gray-200 shadow-lg rounded-lg">
        <CardHeader className="bg-gray-50 p-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {project.title}
          </CardTitle>
          <div className="flex justify-between items-center mt-2">
            <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-6">
          {/* Project Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Project Progress</span>
              <span className="text-sm font-bold text-gray-800">
                {calculateProjectProgress()}%
              </span>
            </div>
            <Progress 
              value={calculateProjectProgress()} 
              className={`w-full ${getProgressColor(calculateProjectProgress())}`}
            />
          </div>

          {/* Project Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Project Description</h3>
            <p className="text-gray-600">{project.description || 'No description available'}</p>
          </div>

          {/* Tasks Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks available</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task._id} 
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {task.completed ? (
                        <CheckCircle2 className="text-green-500" />
                      ) : (
                        <Clock className="text-gray-500" />
                      )}
                      <div>
                        <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleCompleteTask(task._id)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleProjectManagement;