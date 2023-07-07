const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const filePath = 'names.json';

app.get('/get-name', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
        } else {
            const names = JSON.parse(data);
            res.json(names);
        }
    });
});

app.post('/send-name', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
            return;
        }

        const names = JSON.parse(data);

        // busca o maior ID existente
        const maxId = names.reduce((max, name) => Math.max(max, name.id), 0);

        const { nome } = req.body;
        const newPost = {
            id: maxId + 1, // incrementa o ID automaticamente
            nome,
        };

        names.push(newPost);

        fs.writeFile(filePath, JSON.stringify(names), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                res.status(500).json({ error: 'Erro ao salvar o arquivo' });
            } else {
                res.json({ message: 'Post criado com sucesso', post: newPost });
            }
        });
    });
});

app.delete('/delete-name/:id', (req, res) => {
    const { id } = req.params;
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo' });
        return;
      }
  
      let names = JSON.parse(data);
  
      // Filtra os objetos com IDs diferentes do ID fornecido
      names = names.filter((name) => name.id !== parseInt(id));
  
      fs.writeFile(filePath, JSON.stringify(names), (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo:', err);
          res.status(500).json({ error: 'Erro ao salvar o arquivo' });
        } else {
          res.json({ message: 'Objeto deletado com sucesso' });
        }
      });
    });
  });
  

app.put('/update-name/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
            return;
        }

        let names = JSON.parse(data);

        // Procura o objeto com o ID fornecido
        const nameToUpdate = names.find((name) => name.id === parseInt(id));

        if (!nameToUpdate) {
            res.status(404).json({ error: 'Nome não encontrado' });
            return;
        }

        // Atualiza o nome
        nameToUpdate.nome = nome;

        fs.writeFile(filePath, JSON.stringify(names), (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                res.status(500).json({ error: 'Erro ao salvar o arquivo' });
            } else {
                res.json({ message: 'Nome atualizado com sucesso', name: nameToUpdate });
            }
        });
    });
});



if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8');
}

app.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});
