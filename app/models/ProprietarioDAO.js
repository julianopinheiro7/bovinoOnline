function ProprietarioDAO(connection){
    this._connection = connection;
}

ProprietarioDAO.prototype.postProprietario = function(proprietario, callback){
    this._connection.query('insert into proprietario set ?', proprietario, callback);
}

ProprietarioDAO.prototype.getProprietario = function(callback){
    this._connection.query('select * from proprietario', callback);
}

module.exports = function(){
    return ProprietarioDAO;
}