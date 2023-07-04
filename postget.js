const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());


// definição do nome do arquivo
const filePath = 'names.json';


// metodo GET para visualizar o arquivo names.json
app.get('/get-name', (req, res) => {

    // o err recebe erro, caso haja. o data recebe o conteudo do arquivo names.js(o filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {

        // caso haja erro:
        if (err) {
            // resposta no console ao erro
            console.error('Erro ao ler o arquivo:', err);
            //  resposta ao erro
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
        }

        else {
            const names = JSON.parse(data);

            // retorna o objeto que compoe o arquivo
            res.json(names);
        }

    });

});

// metodo POST  para enviar um objeto para o arquivo names.json
app.post('/send-name', (req, res) => {

    // atributos do corpo da mensagem
    const { id, nome } = req.body;

    // compõe o que vai ser usado para o POST
    const newPost = { id, nome };

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
            return;
        }



        const names = JSON.parse(data);

        // insere o POST no final do documento
        names.push(newPost);

        fs.writeFile(filePath, JSON.stringify(names), (err) => {
            // caso haja um erro
            if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                // resposta negativa
                res.status(500).json({ error: 'Erro ao salvar o arquivo' });
            } else {
                // resposta positiva ao metodo
                res.json({ message: 'Post criado com sucesso' });
            }
        });
    });
});

// verifica se o arquivo existe
if (!fs.existsSync(filePath)) {
    // cria o arquivo vazio caso não exista
    fs.writeFileSync(filePath, '[]', 'utf8');
}

// escuta e avisa quando o servidor iniciar
app.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});
