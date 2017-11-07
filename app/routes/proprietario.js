module.exports = function (application) {
    application.get('/listaProprietario', (req, res) => {
        application.app.controllers.proprietario.listaProprietario(application, req, res);
    });

    application.get('/cadastraProprietario', (req, res) => {
        application.app.controllers.proprietario.cadastraProprietario(application, req, res);
    });

    application.post('/proprietario/cadastrar', (req, res) => {
        application.app.controllers.proprietario.cadastrar(application, req, res);
    });

    application.get('/excluiProprietario', (req, res) => {
        application.app.controllers.proprietario.excluirProprietario(application, req, res);
    });
}