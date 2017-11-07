function BovinoDAO(connection){
    this._connection = connection;
}

BovinoDAO.prototype.postBovino = function(bovino, callback){
    this._connection.query('insert into bovino set ?', bovino, callback);
}

BovinoDAO.prototype.getBovinos = function(callback){
    this._connection.query("select  b.id_bovino, b.nome, b.raca, b.peso, b.idade, p.nome as proprietario, case when b.sexo = 'M' then 'Macho' when b.sexo = 'F' then 'Fêmea' end 'sexo' from bovino as b inner join proprietario as p on p.id_proprietario = b.proprietario", callback);
}

BovinoDAO.prototype.getBovinosProprietario = function(id_proprietario, callback){
    this._connection.query("select * from bovino where proprietario = ?", id_proprietario, callback);
}

module.exports = function(){
    return BovinoDAO;
}