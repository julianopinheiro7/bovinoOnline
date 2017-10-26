module.exports.listaProprietario = function (application, req, res) {
    const connection = application.config.dbConnection();

    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);

    proprietarioModel.getProprietario((err, result) => {
        res.render('proprietario/listaProprietario', {proprietarios: result});
    });

}

module.exports.cadastraProprietario = function (application, req, res) {
    let msg = '';

    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    res.render('proprietario/cadastraProprietario', {sucess: msg});
}

module.exports.cadastrar = function (application, req, res) {
    let proprietario = req.body;

    const connection = application.config.dbConnection();

    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);

    proprietarioModel.postProprietario(proprietario, (err, result) => {
        if(err != null){
            res.redirect('/cadastraProprietario?msg=F');
        }
        else{
            res.redirect('/cadastraProprietario?msg=T');
        }       
    });
}