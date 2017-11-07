function ProprietarioDAO(connection){
    this._connection = connection;
}

ProprietarioDAO.prototype.postProprietario = function(proprietario, callback){
    delete proprietario.id_proprietario;
    this._connection.query('insert into proprietario set ?', proprietario, callback);
}

ProprietarioDAO.prototype.getProprietarios = function(callback){
    this._connection.query('select * from proprietario', callback);
}

ProprietarioDAO.prototype.getProprietario = function(id, callback){
    this._connection.query('select * from proprietario where id_proprietario = ' + id, callback);
}

ProprietarioDAO.prototype.putProprietario = function(proprietario, callback){
    let id_proprietario = proprietario.id_proprietario;
    delete proprietario.id_proprietario;

    this._connection.query('update proprietario set ? where id_proprietario = ?', [proprietario, id_proprietario], callback);
}

ProprietarioDAO.prototype.getProprietariosSelect = function(callback){
    this._connection.query('select id_proprietario, nome from proprietario', callback);
}

ProprietarioDAO.prototype.deleteProprietario = function(id_proprietario, callback){
    this._connection.query('delete from proprietario where id_proprietario = ?', id_proprietario, callback);
}

module.exports = function(){
    return ProprietarioDAO;
}