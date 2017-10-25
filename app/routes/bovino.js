module.exports = function (application) {
    application.get('/listaBovino', (req, res) => {
        application.app.controllers.bovino.listaBovino(application, req, res);
    });

    application.get('/cadastraBovino', (req, res) => {
        application.app.controllers.bovino.cadastraBovino(application, req, res);
    });

    application.post('/bovino/cadastrar', (req, res) => {
        application.app.controllers.bovino.cadastrar(application, req, res);
    });
}