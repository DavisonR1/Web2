const db = require('./db');

const Post = db.sequelize.define('posts',{

	titulo:{
		unique: true,
		allowNull: false,
		type: db.Sequelize.STRING

	},
	conteudo:{
		type: db.Sequelize.STRING
		
	},
    usuarioId:{
        type: db.Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = Post;
Post.sync({force: true})