/* eslint-disable react/prop-types */
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = ({acceptedProjects, setAcceptedProjects}) => {
  const [projects, setProjects] = useState([]);
  const [updatedProjects, setUpdatedProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://ionotsassignment.onrender.com/api/projects');
        setProjects(res.data.response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    const updatedProjects = projects.filter((project) => 
      acceptedProjects.some((p) => p.project !== project._id)
    );
    setUpdatedProject(updatedProjects);
    console.log(updatedProjects);
  }, [acceptedProjects, projects]);
  

  const handleAcceptProject = async () => {
    if (selectedProject) {
      try {
        const response = await axios.post(`https://ionotsassignment.onrender.com/api/acceptproject?id=${selectedProject._id}`);
        if(response.status===200){
          setAcceptedProjects(response.data.response);
        }
      } catch (error) {
        console.error("Error accepting project:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Projects</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updatedProjects && updatedProjects.map(project => (
            <Card 
              key={project._id} 
              className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {project.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 bg-white">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedProject(project)}
                    >
                      Accept Project
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Accept Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to accept the project "{project.title}"?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleAcceptProject}>
                        Accept
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500 mt-12 bg-gray-100 p-8 rounded-lg">
            <p className="text-xl">No projects available at the moment</p>
            <p className="text-sm text-gray-400 mt-2">Check back later for new opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;