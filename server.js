const express = require('express');
const app = express();
const port = 8081;
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false})
const path = require('path');
const Usuario = require('./modelos/Usuario')
const Post = require('./modelos/Post')



//Template Engine
app.use(express.static(path.join(__dirname, '/views')));
app.set('views', path.join(__dirname, '/views'))

app.engine ('handlebars', exphbs.engine({defaultLayout:'main',extname:'.handlebars',
layoutsDir: path.join(__dirname, 'views/layouts')}));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Rota HOME
app.get('/', (req, res) => {
	res.render('home.handlebars')
})

//Rotas de USUARIOS
app.get('/cadUsu',function (req,res){
	res.render('cadUsu.handlebars')
});

app.get('/loginUsu',function (req,res){
	res.render('loginUsu.handlebars')
});


app.get('/Usuarios', (req, res) => {
	Usuario.findAll({order: [['id','DESC']]}).then(function(usuarios){
		res.render('VisualizarUsu.handlebars', {usuarios: usuarios})
	})
});

app.post('/addUsuario', function (req,res){
	Usuario.create({
		login:req.body.login,
		email: req.body.email,
		senha: req.body.senha,
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
app.get('/upUsuario/:id',urlEncodedParser, function(req,res){
	res.render('atualizaUsu.handlebars',{id:req.params.id});
});
//Não está pegando - tentei, vi vários vídeos e não consegui
app.put('/Usuarios', urlEncodedParser, (req,res)=>{
	var id = req.body.id;
	
	var usuarioAtualizado = {id:id, nome:nome, email:email, senha:senha, login:login};
	
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
//Não está carregando - tentei, vi vários vídeos e não consegui
app.post('/atualizaUsu/:id	', urlEncodedParser, function(req,res){
	var id = req.query.id;
	Usuario.findOne({
		where:{
			id:id,
		
		}
	}).then(function(usuarios){
		console.log(usuarios);
		
		res.render('atualizaUsu.handlebars', {usuarios:usuarios})
				
	}).catch(function(erro){
		console.log("Erro na consulta: "+erro)
		res.send("Ocorreu algum problema na consulta");
	})

});


//Rotas de POSTAGENS
app.get('/cadPost',function (req,res){
	res.render('./posts/cadPost.handlebars')
});

app.get('/Posts', (req, res) => {
	Post.findAll({order: [['id','DESC']]}).then(function(posts){
		res.render('./posts/visuPost.handlebars', {posts: posts})
	})
});

app.post('/AddPost', (req,res) => {
	Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo,
	}).then(function(){
		res.redirect('/Posts')
	}).catch(function(erro){
		red.send("Houve um erro de postagem: " +erro)
	})
});
app.get('/deletarPost/:id',function(req, res){
	Usuario.destroy({where: {'id': req.params.id}}).then(function(){
		res.redirect("/Posts")
	}).catch(function(erro){
		res.send("Este post não existe")
	})
});








    

app.listen(port, () => {
console.log(`Esta aplicação está escutando a
porta ${port}`)
})
