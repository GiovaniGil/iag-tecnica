var path = require('path');

/*
1. crie um REST com 4 métodos
1.1 buscar por id (método REST GET, path: /indicador/{id})
1.2 buscar todos (método REST GET, path: /indicador/all
1.3 inserir/atualizar ( método REST POST, path /indicador/save, enviar o corpo no POST como JSON)
1.4 deletar ( método REST DELETE, path /indicador/delete/{id} )
1.5 Os dados devem ser gravados no PostgresSQL
*/

module.exports = function (app) {


	//1.1 buscar por id (método REST GET, path: /indicador/{id})
	app.get('/indicador/:id([0-9]+$)', function (req, res) {
		if (!isNaN(req.params.id)) {
			var connection = app.infra.connectionFactory.connect();
			var indicadoresDAO = new app.infra.IndicadoresDAO(connection);
			indicadoresDAO.buscarPorId(req.params.id,
				(items) => {
					connection.end();
					if (items.rowCount > 0)
						res.status(200).json(items.rows[0]);
					else
						res.status(200).json({});
				},
				(error) => {
					connection.end();
					res.status(500).json(error);
				});
		}
		else
			res.status(400).json({ message: 'Parâmetro inválido' });
	});



	//1.2 buscar todos (método REST GET, path: /indicador/all
	app.get("/indicador/all", function (req, res, next) {

		var connection = app.infra.connectionFactory.connect();
		var indicadoresDAO = new app.infra.IndicadoresDAO(connection);
		indicadoresDAO.listar(
			(items) => {
				connection.end();
				res.status(200).json(items.rows);
			},
			(error) => {
				connection.end();
				res.status(500).json(error);
			});
	});


	//1.3 inserir/atualizar ( método REST POST, path /indicador/save, enviar o corpo no POST como JSON)
	app.post('/indicador/save', function (req, res) {
		var indicador = req.body;
		var connection = app.infra.connectionFactory.connect();

		var indicadoresDAO = new app.infra.IndicadoresDAO(connection);
		indicadoresDAO.salvar(indicador,
			(items) => {
				connection.end();
				res.status(200).json(items.rows);
			},
			(error) => {
				connection.end();
				res.status(500).json(error);
			});

	});


	//1.4 deletar ( método REST DELETE, path /indicador/delete/{id} )
	app.delete('/indicador/delete/:id([0-9]+$)', function (req, res) {

		if (!isNaN(req.params.id)) {
			var connection = app.infra.connectionFactory.connect();
			var indicadoresDAO = new app.infra.IndicadoresDAO(connection);
			indicadoresDAO.remover(req.params.id,
				(item) => {
					connection.end();
					res.status(200).json({ affectedRows: item.rowCount });
				},
				(error) => {
					connection.end();
					res.status(500).json(error);
				});
		}
		else
			res.status(400).json({ message: 'Parâmetro inválido' });;
	});


}
