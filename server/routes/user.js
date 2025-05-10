const { createConnection, handleError, express } = require('./../config/setup');

const router = express.Router();

let conex;
const init = async () => conex = await createConnection();
init();

router.post('/login', async (req, res) => {
    const { emailORUserName, pass } = req.body;

    try {
        const [resultLogin] = await conex.execute(
            "SELECT * FROM usuarios WHERE (email = ? OR userName = ?) ? AND pass = ?",
            [emailORUserName, emailORUserName, pass]
        );

        if (resultLogin.length == 0) return handleError(res, 'Credenciales incorrectas', null, 401);

        res.status(200).send({ message: 'Se logeo correctamente', resultLogin });
    } catch (err) {
        return handleError(res, 'Error al logearse', err);
    }
});

router.post('/registro', async (req, res) => {

    const { email, pass, userName, realName } = req.body;

    try {
        const [emailExists] = await conex.execute(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (emailExists.length > 0) return handleError(res, 'El email ya existe', null, 409);

        const [userNameExists] = await conex.execute(
            "SELECT * FROM usuarios WHERE userName = ?",
            [userName]
        );

        if (userNameExists.length > 0) return handleError(res, 'El nombre de usuario ya existe', null, 409);

        if (!email || !pass || !userName || !realName) {
            return handleError(res, 'Faltan campos obligatorios', null, 400);
        }



        await conex.execute(
            "INSERT INTO usuarios (email, pass, userName, realName) VALUES (?, ?, ?, ?)",
            [email, pass, userName, realName]
        );

        res.status(201).send({ message: 'Se Inserto correctamente', resultRegistro });
    } catch (err) {
        return handleError(res, 'Error al registrarse', err);
    }
});


module.exports = router;