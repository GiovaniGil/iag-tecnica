function IndicadoresDAO(connection) {
    this._connection = connection;
}

IndicadoresDAO.prototype.listar = function (callback, error) {
    this._connection.query('SELECT * FROM indicador ORDER BY id ASC')
        .then(items => callback(items))
        .catch(err => error(err.stack));
}

IndicadoresDAO.prototype.buscarPorId = function (id, callback, error) {
    this._connection.query('SELECT * FROM indicador WHERE id = $1', [id])
        .then(items => callback(items))
        .catch(err => error(err.stack));
}

IndicadoresDAO.prototype.remover = function (id, callback, error) {
    this._connection.query('DELETE FROM indicador WHERE id = $1', [id])
        .then(item => callback(item))
        .catch(err => error(err.stack));
}

IndicadoresDAO.prototype.salvar = function (object, callback, error) {

    var query = '';
    if (!object.id) {
        query = `INSERT INTO indicador( 
            "dataIntegracao", 
            "dataUltAlteracao", 
            "formulaCalculo",  
            "idDrgIntegracao",  
            "identDirecaoSeta",  
            "identPeriodicidade", 
            "identReferencial", 
            "informacoesAdicionais",  
            "nome", 
            "numDecimais", 
            "objetivo", 
            "unidade", 
            "usuarioUltAlteracao", 
            "versao") VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 )  RETURNING *`;
    } else {
        query = `UPDATE indicador SET
            "dataIntegracao" = $1,
            "dataUltAlteracao" = $2, 
            "formulaCalculo" = $3,  
            "idDrgIntegracao" = $4,  
            "identDirecaoSeta" = $5,  
            "identPeriodicidade" = $6, 
            "identReferencial" = $7, 
            "informacoesAdicionais" = $8,  
            "nome" = $9, 
            "numDecimais" = $10, 
            "objetivo" = $11, 
            "unidade" = $12, 
            "usuarioUltAlteracao" = $13, 
            "versao" = $14 WHERE id = `+ object.id+'  RETURNING *';
    }

    this._connection.query(query,
        [
            object.dataIntegracao,
            object.dataUltAlteracao,
            object.formulaCalculo,
            object.idDrgIntegracao,
            object.identDirecaoSeta,
            object.identPeriodicidade,
            object.identReferencial,
            object.informacoesAdicionais,
            object.nome,
            object.numDecimais,
            object.objetivo,
            object.unidade,
            object.usuarioUltAlteracao,
            object.versao
        ])
        .then(items => callback(items))
        .catch(err => error(err.stack));
}

module.exports = function () {
    return IndicadoresDAO;
}
