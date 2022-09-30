/*comandos npm
npm init 
npm instal nodemon -g 
npm install -- save express
npm install express-session
npm install --save body-parser
npm install --save mysql
npm install ejs -save
*/

//require do express e do session
const express = require('express');
const session = require("express-session");
const path = require('path');
const app = express();
const mysql= require('mysql');
const { resolveSoa } = require('dns');
const message = " ";
const message2 = " ";


// const login = false;


// const check = document.querySelector("#show-log");


//require do bodyparser responsável por capturar valores do form
const bodyParser = require("body-parser");
const { checkPrime } = require('crypto');

//criando a sessão
app.use(session({secret: "sssshhhhh"}));

//definindo pasta pública para acesso
app.use(express.static('public'));

//config engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

//config bodyparser para leitura de post
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rota padrao
app.get('/', (req, res) => {
     var message = 'login';
     var messagetwo = ' ';
    //  var message2 = 'admin'
   
    // req.session.destroy();
//    var message2 = ' ';
  
    res.render('views', { message: message, messagetwo: messagetwo });
    // res.render('views/index', { message2: message2 });
  
});
//rota padrao
//app.get('/', (req, res) => {
    // var message = 'login';
   // var message2 = ' '
  
   // req.session.destroy();
//    var message2 = ' ';
 
//    res.render('views/index', { message: message });
   //res.render('views/index', { message2: message2 });
 
//});

//rota padrao
app.get('/index', (req, res) => {
   // req.session.destroy();
   var message = 'login';
   var messagetwo = ' ';

//    var rota = './admin'
//    var message2 = ' ';
  
res.render('views', { message: message, messagetwo: messagetwo });
    
});
//rota padrao
//app.get('/index', (req, res) => {
    // req.session.destroy();
    // var message = 'login';
 //    var message2 = ' ';
   
    //  res.render('views/index', { message: message });
   //  res.render('views/index', { messagetwo: messagetwo });
     
 //});

//rota cardapio
app.get('/cardapio', (req, res) => {
    // req.session.destroy();
    var message = 'login';
   var messagetwo = ' '
    res.render('views/cardapio', { message: message, messagetwo: messagetwo });
});

//rota login
app.get('/admin', (req, res) => {
    // req.session.destroy();
    var message = 'login';
   var messagetwo = ' '
    res.render('views/admin', { message: message, messagetwo: messagetwo });
});

// rota controle de estoque
app.get('/controle', (req, res) => {
    // req.session.destroy();
    var message = 'login';
   var messagetwo = ' '
    res.render('views/controle', { message: message, messagetwo: messagetwo });
});

//rota serviços
app.get('/servicos', (req, res) => {
    // req.session.destroy();
    var message = 'login';
   var messagetwo = ' '
    res.render('views/servicos', { message: message, messagetwo: messagetwo });
});

//rota cadastro
app.get('/cda', (req, res) => {
    // req.session.destroy();
    var message = 'login';
   var messagetwo = ' '
    res.render('views/cda', { message: message, messagetwo: messagetwo });
});

// rpta para login
app.get("/admin", function(req, res){
    var message = 'login';
   var messagetwo = ' '
   res.render('views/cda', { message: message, messagetwo: messagetwo })
});

//rota para home
app.get("/views/index", function (req, res){
    
    //verifica se existe seção ativa
    if (req.session.user){
        var con = conectiondb();
        var query2 = 'SELECT * FROM users WHERE email LIKE ?';
        con.query(query2, [req.session.user], function (err, results){
            res.render('views/index', {message:results});

        });
        
    }else{
        res.redirect("/");
    }
    
});

//conexão com banco mysql
function conectiondb(){
    
    var con = mysql.createConnection({
        host: 'localhost', // O host do banco. Ex: localhost
        user: 'root', // Um usuário do banco. Ex: user 
        password: '', // A senha do usuário. Ex: user123
        database: 'jazz' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    });

    //verifica conexao com o banco
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
    });

    return con;
}


//método post do register
app.post('/cda', function (req, res){

    var username = req.body.username;
    var pass = req.body.pass;
    var email = req.body.email;
    var phone = req.body.phone;
    var cpf = req.body.cpf;

    var con = conectiondb();

    var queryConsulta = 'SELECT * FROM user WHERE email LIKE ?';

    con.query(queryConsulta, [email], function (err, results){
        console.log(results)
          //if (results.length > 0){            
            // var message = 'E-mail já cadastrado';
             //res.render('views/cda', { message: message });
         //}else{
             var query = 'INSERT INTO user VALUES (DEFAULT, ?, ?, ?, ?,?)';

            con.query(query, [username, email, pass, phone,cpf], function (err, results){
                if (err){
                    throw err;
                }else{
                    console.log ("Usuario adicionado com email " + email);
                    
                }        
            });
       // }
    });
});




//método post do login
app.post('/adm', function (req, res){
     //pega os valores digitados pelo usuário
     var email = req.body.email;
     var pass = req.body.pass;
     //conexão com banco de dados
     var con = conectiondb();
     //query de execução
     var query = 'SELECT * FROM user WHERE email = ? AND senha LIKE ?';
    //  var message = "controle";
     //execução da query
    //  message = 'controle'
     con.query(query, [email, pass], function (err, results){
         if (results.length > 0){
            //  req.session.user = email; //seção de identificação            
             console.log("Login feito com sucesso!");
             var message = '';
             var messagetwo = 'controle'
           

            // var control = 'controle';
            res.render('views', { message: message, messagetwo: messagetwo });
            res.render('views/cardapio', { message: message, messagetwo: messagetwo });
            res.render('views/servicos', { message: message, messagetwo: messagetwo });
            res.render('views/controle', { message: message, messagetwo: messagetwo });
            //  res.render('views/index', {message:results});
             
         }else{
             console.log('login incorreto');
            //  var message = ''
             res.write('views/index', { message:message});
         };
         
     });
 });

//  function check(){
//     let check = document.querySelector("#show-log")
    
//             check.classList.remove('close');
//             check.classList.add('open');

//  }

//executa servidor
app.listen(8081, () => console.log(`App listening on port!`));