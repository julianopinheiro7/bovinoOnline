module.exports.listaBovino = function (application, req, res) {
    const connection = application.config.dbConnection();

    const bovinoModel = new application.app.models.BovinoDAO(connection);

    bovinoModel.getBovinos((err, result) => {
        res.render('bovino/listaBovino', {bovinos: result});
    });

}

module.exports.cadastraBovino = function (application, req, res) {
    let msg = '';

    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    res.render('bovino/cadastraBovino', {sucess: msg});
}

module.exports.cadastrar = function (application, req, res) {
    let bovino = req.body;

    const connection = application.config.dbConnection();

    const bovinoModel = new application.app.models.BovinoDAO(connection);

    bovinoModel.postBovino(bovino, (err, result) => {
        if(err != null){
            res.redirect('/cadastraBovino?msg=F');
        }
        else{
            res.redirect('/cadastraBovino?msg=T');
        }
       
    });
}