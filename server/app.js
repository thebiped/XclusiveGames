const express = require('express');
const path = require('path');

const app = express();
const port = process.env.API_PORT || 5001;

const createConnection = require(path.join(__dirname, 'config', 'conexBD'));

let conex;
async function init() {
    conex = await createConnection();
}
init();

app.use(express.json());

const handleError = (res, message, err = null, status = 500) => {
    console.error(message, err);
    res.status(status).send({ message });
};

//rutas
app.use('/user', require(path.join(__dirname, 'routes', 'user')));

app.get('/ping', async (req, res) => {
    res.send('Pong');
});

app.listen(port, () => console.log(`Server escuchando en el puerto port!`));