module.exports.listaBovino = function (application, req, res) {
    const connection = application.config.dbConnection();

    const bovinoModel = new application.app.models.BovinoDAO(connection);

    bovinoModel.getBovinos((err, result) => {
        res.render('bovino/listaBovino', { bovinos: result });
    });

}

module.exports.cadastraBovino = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const connection = application.config.dbConnection();
    const proprietarioModel = new application.app.models.ProprietarioDAO(connection);
    const bovinoModel = new application.app.models.BovinoDAO(connection);

    if (req.query.id != undefined) {

        bovinoModel.getBovino(req.query.id, (err, result) => {
            proprietarioModel.getProprietariosSelect((err2, result2) => {
                if (err2 != null) {
                    res.render('bovino/cadastraBovino', { sucess: msg, bovino: result[0], selectProprietarios: result2 });
                } else {
                    res.render('bovino/cadastraBovino', { sucess: msg, bovino: result[0], selectProprietarios: result2 });
                }
            });
        });
    } else {
        proprietarioModel.getProprietariosSelect((err, result) => {
            res.render('bovino/cadastraBovino', { sucess: msg, bovino: {}, selectProprietarios: result });
        });
    }
}

module.exports.cadastrar = function (application, req, res) {

    let bovino = req.body;
    const connection = application.config.dbConnection();
    const bovinoModel = new application.app.models.BovinoDAO(connection);

    if (bovino.id_bovino == '') {
        bovinoModel.postBovino(bovino, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraBovino?msg=F');
            }
            else {
                res.redirect('/cadastraBovino?msg=T');
            }
        });
    } else {
        bovinoModel.putBovino(bovino, (err, result) => {
            if (err != null) {
                res.redirect('/cadastraBovino?msg=F');
            }
            else {
                res.redirect('/cadastraBovino?msg=T');
            }
        });
    }
}

// Excluir
module.exports.excluirBovino = function (application, req, res) {
    let bovino = req.body;
    const connection = application.config.dbConnection();
    const bovinoModel = new application.app.models.BovinoDAO(connection);

    if (req.query.id != undefined) {

        bovinoModel.deleteBovino(req.query.id, (err, result) => {
            if (err != null) {
                res.redirect('/listaBovino?msg=F');
            }
            else {
                res.redirect('/listaBovino?msg=T');
            }
        });
    }
    else {
        res.redirect('/listaBovino?msg=F');
    }
}
