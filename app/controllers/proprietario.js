module.exports.listaProprietario = function (application, req, res) {
    const connection = application.config.dbConnection();

    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);

    proprietarioModel.getProprietarios((err, result) => {
        res.render('proprietario/listaProprietario', { proprietarios: result });
    });

}

module.exports.cadastraProprietario = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    if (req.query.id != undefined) {
        const connection = application.config.dbConnection();

        const proprietarioModel = new application.app.models.ProprietarioDAO(connection);

        proprietarioModel.getProprietario(req.query.id, (err, result) => {
            if (err != null) {
                res.render('proprietario/cadastraProprietario', { sucess: msg, proprietario: result[0] });
            }
            else {
                res.render('proprietario/cadastraProprietario', { sucess: msg, proprietario: result[0] });
            }
        });
    }
    else {
        res.render('proprietario/cadastraProprietario', { sucess: msg, proprietario: {} });
    }
}

module.exports.cadastrar = function (application, req, res) {
    let proprietario = req.body;

    const connection = application.config.dbConnection();

    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);

    if (proprietario.id_proprietario == '') {       
        proprietarioModel.postProprietario(proprietario, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraProprietario?msg=F');
            }
            else {
                res.redirect('/cadastraProprietario?msg=T');
            }
        });
    } else{
        proprietarioModel.putProprietario(proprietario, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraProprietario?msg=F');
            }
            else {
                res.redirect('/cadastraProprietario?msg=T');
            }
        });
    }
}