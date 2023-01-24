const express = require('express');
const app = express();
const port = 8081;
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false})
const path = require('path');
const Usuario = require('./modelos/Usuario')

//Template Engine
app.use(express.static(path.join(__dirname, '/views')));
app.set('views', path.join(__dirname, '/views'))

app.engine ('handlebars', exphbs.engine({defaultLayout:'main',extname:'.handlebars',
layoutsDir: path.join(__dirname, 'views/layouts')}));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => {
	res.render('home.handlebars')
})

app.get('/Usuarios', (req, res) => {
	Usuario.findAll({order: [['id','DESC']]}).then(function(usuarios){
		res.render('VisualizarUsu.handlebars', {usuarios: usuarios})
	})
});

 app.get('/cad',function (req,res){
	res.render('formulario.handlebars')
});

app.post('/addUsuario', function (req,res){
	Usuario.create({
		email: req.body.email,
		senha: req.body.senha,
		confirmarsenha:req.body.confirmarsenha,
		nome: req.body.nome,
		
	}).then(function(){
		res.redirect('/Usuarios')
	}).catch(function(erro){
		red.send("Houve um erro de cadastro: " +erro)
	})
});

app.get('/deletarUsu/:id',function(req, res){
	Usuario.destroy({where: {'id': req.params.id}}).then(function(){
		res.redirect("/Usuarios")
	}).catch(function(erro){
		res.send("Este usuario não existe")
	})
});
//Não está pegando
app.get('/Usuarios/:id', (req, res) => {
	return res.render(Usuario[id])
});
//Não está pegando
app.get('/bucaUsuario', (req,res) => {
	res.render('buscaUsu.handlebars');
});
//Não está pegando
app.get('/upusuario',(req,res)=>{
	res.render('atualizaUsu.handlebars')
});
//Não está pegando
app.put('/Usuarios', urlEncodedParser, (req,res)=>{
	var id = req.body.id;
	var nome = req.body.nome;
	var email = req.body.email;
	var senha = req.body.senha;
	
	var usuarioAtualizado = {id:id, nome:nome, email:email, senha:senha};
	
	Usuario.update(usuarioAtualizado, {
		where:{
			id:id
		}
	} ).then(function(){
			console.log("Usuario atualizado com sucesso!");
			res.send("Usuario atualizado com sucesso!");
			
		}).catch(function(erro){
			console.log("Erro ao atualizar Usuario: "+erro);
			res.send("Houve um problem na atualização do Usuario!!");
	});

});
//Não está pegando
app.get('/atualizaUsuario',(req,res)=>{
	var id = req.query.id;
	Usuario.findOne({
		where:{
			id:id,
		
		}
	}).then(function(usuarios){
		console.log(usuarios);
		
		res.render('atualizaUsu', {usuarios:usuarios})
				
	}).catch(function(erro){
		console.log("Erro na consulta: "+erro)
		res.send("Ocorreu algum problema na consulta");
	})

});


    

app.listen(port, () => {
console.log(`Esta aplicação está escutando a
porta ${port}`)
})
