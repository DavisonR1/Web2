const Sequelize = require('sequelize');
const sequelize = new Sequelize ('pp1', 'root', '33767958Da', {
	host: 'localhost',
	dialect: 'mysql',
	query:{raw:true}
});

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
};



