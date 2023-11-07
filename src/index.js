const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


const server = express();
server.use(cors());
server.use(express.json({ limit: '25mb' }));
server.set("view engine", "ejs");

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_proyectos_molones',
    user: 'freedb_hierbas',
    password: 'eD8qhz*taP#Ja%w',
  });
  connection.connect();
  return connection;
}

const port = 2002;
server.listen(port, () => {
  console.log('Holiii' + port);
});

server.get('/project', async (req, res) => {
  const sql =
    'SELECT user.name AS autor, user.image_user AS image , project.name_project AS name, project.slogan, project.repo, project.demo, project.tech, project.desc FROM user INNER JOIN project ON user.iduser = project.fk_user';

  const connection = await getConnection();
  const [results] = await connection.query(sql);
  connection.end();
  res.json({
    success: true,
    projects: results,
  });
});

server.post('/project', async (req, res) => {
  const body = req.body;
  //queries
  let addAutor = `INSERT INTO user (name, job, image_user) VALUES ('?','?','?')`;
  let addProject = `INSERT INTO project (name_project, slogan, repo, demo, tech, image_project) VALUES ('?','?','?','?','?','?')`;
  //conexión
  const connection = await getConnection();
  //ejecutar query
  const [resultData] = await conn.query(
    addAutor,
    addProject[(req.body.name, req.body.job, req.body.image_user)],
    [
      req.body.name_project,
      req.body.slogan,
      req.body.repo,
      req.body.demo,
      req.body.tech,
      req.body.image_project,
    ]
  );
  console.log(resultData); //.insertId

  res.json({
    success: true,
    /*cardURL: `http://localhost:5173/#/projects/${resultData.insertId}`, */
  });
  connection.end();
});
server.get('/project/:idproject', async (req, res)=> {
  const id = req.params.idproject;
  const selectProject =  'SELECT user.name AS autor, user.job, user.image_user AS image , project.name_project AS name, project.slogan, project.repo, project.demo, project.tech, project.desc, project.image_project AS photo FROM user INNER JOIN project ON user.iduser = project.fk_user WHERE idproject = ?';
  const connection = await getConnection();
  const [results]= await connection.query(selectProject, [id]);
  if (results.length === 0) {
    res.render("projectNotFound")
  }else {
    res.render ("detailProject", results [0])
  }
  connection.end();
})



const staticServerPath = './web/dist';
server.use(express.static(staticServerPath));

const pathServerPublicStyles = './src/public-css';
server.use(express.static(pathServerPublicStyles));
