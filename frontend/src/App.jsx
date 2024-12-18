import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProjectList from './components/projectList';
import axios from 'axios';
import Navbar from './components/navBar';
import ActiveProject from './components/ActiveProject';

function App() {
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    const fetchAcceptedProjects = async()=>{
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/acceptproject");
        setAcceptedProjects(res.data.response);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    } 
    fetchAcceptedProjects();
  },[]);
  return (
    <>
      <Navbar />
      <Router>
      <Routes>
        <Route path="/" element={<ProjectList acceptedProjects={acceptedProjects} setAcceptedProjects={setAcceptedProjects} />} />
        {/* {/* <Route path="/projects" element={<Projects />} /> */}
        <Route path="/active-projects" element={<ActiveProject isLoading={isLoading} projects={acceptedProjects} />} /> 
        <Route path="*" element={<p>No Page found</p>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
