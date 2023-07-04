const express = require("express");

const app = express();
app.use(express.json());

const teste = [];

app.listen(3000);app.post("/post-name", (req, res) => {
    const { id, name } = req.body;
  
    const conteudo = {
      id,
      name,
    };
  
    teste.push(conteudo);
  
    return res.json(conteudo);
  });