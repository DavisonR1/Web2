const db = require('./db');

const Usuario = db.sequelize.define('usuarios',{
	email:{
		type: db.Sequelize.STRING
	},
	senha:{
		type: db.Sequelize.STRING
	},
	confirmarsenha:{
		type: db.Sequelize.STRING
	},
	nome:{
		type: db.Sequelize.STRING
	},


})

module.exports = Usuario
//Usuario.sync({force: true})

