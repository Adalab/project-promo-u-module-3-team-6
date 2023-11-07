import { useState, useEffect } from 'react';
import React from 'react';
import '../styles/layout/Projects.scss';
import Card from './Card';
import api from '../services/api';

const projects = () => {
  const [listProject, setListProject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getDataProjects();
      setListProject(data.projects);
    };
    fetchData();
  }, []);

  /*const fakeData = {
    name: 'proyect',
    slogan: 'hola',
    repo: '',
    demo: '',
    technologies: '',
    desc: '',
    autor: 'claudia',
    job: 'babyfullstack',
    image: 'src/images/hierbas.webp',
    photo: 'src/images/2.jpg',
  };*/

  return (
    <>
      <div className="projects__div">
        {/* 
        <section className="projects__section">
      <a href="">Agregar nuevo proyecto</a> 
        </section>
      */}
        {listProject.map((project) => {
          return <Card data={project} />;
        })}

        {/*  <Card data={fakeData} />*/}
      </div>
    </>
  );
};

export default projects;
