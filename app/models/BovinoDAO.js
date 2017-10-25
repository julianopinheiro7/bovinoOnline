function BovinoDAO(connection){
    this._connection = connection;
}

BovinoDAO.prototype.postBovino = function(bovino, callback){
    this._connection.query('insert into bovino set ?', bovino, callback);
}

module.exports = function(){
    return BovinoDAO;
}