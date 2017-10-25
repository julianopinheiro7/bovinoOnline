module.exports.listaBovino = function (application, req, res) {
    const connection = application.config.dbConnection();

    const bovinoModel = new application.app.models.BovinoDAO(connection);

    bovinoModel.getBovinos((err, result) => {
        res.render('bovino/listaBovino', {bovinos: result});
    });

}

module.exports.cadastraBovino = function (application, req, res) {
    res.render('bovino/cadastraBovino');
}

module.exports.cadastrar = function (application, req, res) {
    let bovino = req.body;

    const connection = application.config.dbConnection();

    const bovinoModel = new application.app.models.BovinoDAO(connection);

    bovinoModel.postBovino(bovino, (err, result) => {
        res.redirect('/cadastraBovino');
    });
}