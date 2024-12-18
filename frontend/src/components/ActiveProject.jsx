/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

const ActiveProjects = ({ projects, isLoading }) => {
    console.log(projects);
  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const calculateProgress = (project) => {
    const tasks = project.tasks;
    let Totalpoints = 0;
    let completedPoints = 0;
    tasks.forEach(task => {
        Totalpoints += task.task.points
        if(task.task.isComplete){
            completedPoints += task.task.points;
        }
    });
    const progress = (completedPoints/Totalpoints)*100;
    return progress;
  };
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Active Projects</h1>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 bg-gray-100 p-8 rounded-lg">
          <p className="text-xl">No active projects at the moment</p>
          <p className="text-sm text-gray-400 mt-2">
            Browse available projects to get started
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {project.title}
                </CardTitle>
                <div className="flex justify-between items-center mt-2">
                  <Badge
                    variant={
                      project.status === "Completed" ? "default" : "secondary"
                    }
                  >
                    {project.status || "N/A"}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Started:{" "}
                    {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Project Progress
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {calculateProgress(project)}%
                    </span>
                  </div>
                  <Progress
                    value={calculateProgress(project)}
                    className={`w-full ${getProgressColor(
                      calculateProgress(project)
                    )}`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-md font-semibold text-gray-700">
                    Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    {project.project.description || "No description available"}
                  </p>
                </div>

                {/* Tasks Section */}
                <div className="space-y-2">
                  <h3 className="text-md font-semibold text-gray-700">
                    Tasks
                  </h3>
                  {project.tasks && project.tasks.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {project.tasks.map((task, index) => (
                        <li key={index}>{task.task.taskName}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400">No tasks available</p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Score:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {project.score || "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveProjects;
