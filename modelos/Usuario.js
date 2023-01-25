const db = require('./db');

const Usuario = db.sequelize.define('usuarios',{
	id:{
		type: db.Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	login:{
		unique: true,
		allowNull: false,
		type: db.Sequelize.STRING

	},
	email:{
		type: db.Sequelize.STRING
		
	},
	senha:{
		type: db.Sequelize.STRING
		
	},
	nome:{
		type: db.Sequelize.STRING

	},
	createdAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
      updatedAt: {
        allowNull: false,
        type: db.Sequelize.DATE
	}

})



module.exports = Usuario
Usuario.sync({force: true})

