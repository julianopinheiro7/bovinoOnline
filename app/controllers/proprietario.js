module.exports.listaProprietario = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const connection = application.config.dbConnection();

    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);

    proprietarioModel.getProprietarios((err, result) => {
        res.render('proprietario/listaProprietario', { proprietarios: result, sucess: msg });
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
    } else {
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

module.exports.excluirProprietario = function (application, req, res) {
    let proprietario = req.body;
    const connection = application.config.dbConnection();
    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);
    const bovinoModel = new application.app.models.BovinoDAO(connection);

    if (req.query.id != undefined) {

        bovinoModel.getBovinosProprietario(req.query.id, (err, result) => {
            if (err != null) {
                res.redirect('/listaProprietario?msg=F');
            }
            else {
                if (result.length > 0) {
                    res.redirect('/listaProprietario?msg=B');
                }
                else {
                    proprietarioModel.deleteProprietario(req.query.id, (err, result) => {
                        if (err != null) {
                            res.redirect('/listaProprietario?msg=F');
                        }
                        else {
                            res.redirect('/listaProprietario?msg=T');
                        }
                    });
                }
            }
        });


    } else {
        res.redirect('/listaProprietario?msg=F');
    }
}