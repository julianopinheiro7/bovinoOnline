function BovinoDAO(connection){
    this._connection = connection;
}

BovinoDAO.prototype.postBovino = function(bovino, callback){
    this._connection.query('insert into bovino set ?', bovino, callback);
}

BovinoDAO.prototype.getBovinos = function(callback){
    this._connection.query('select * from bovino', callback);
}

module.exports = function(){
    return BovinoDAO;
}