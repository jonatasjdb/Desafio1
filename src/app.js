const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [{ id: uuid(), title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }];

app.get("/repositories", (request, response) => {
  response.json(repositories)

});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const id = uuid();
  let likes = 0;
  const repo = {id,title,url,techs,likes}
  repositories.push(repo)
  response.json({id});
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title,url,techs} = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id == id);
  
  if(repoIndex < 0)
  {
    return response.status(400).json({"error": "ID not found."});
  }
  const {likes} = repositories[repoIndex]
  
  const repo = {
    id,
    title,
    url,
    techs,
    likes
  };
  console.log(repositories[repoIndex])
  repositories[repoIndex] = repo;

  response.json({repo})
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  
  if(repoIndex < 0)
  {
    return res.status(400).json({"error": "ID not found."});
  }

  repositories.splice(repoIndex,1);

  return res.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if(repoIndex < 0){
    return response.status(404).json({"error": "ID not found."});
  }
  let {likes} = repositories[repoIndex]
  likes += 1
  
  repositories[repoIndex].likes = likes;

  response.json(repositories[repoIndex])
 

});

module.exports = app;
