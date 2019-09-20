var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000', credentials: false }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  // Post end point in the path "/"
  app.post('/', (req, res) => {
      let result;  
      switch (req.body.Operator) {
        case '+' :  result = req.body.Operand1 + req.body.Operand2;
            break;
        case '-' :  result = req.body.Operand1 - req.body.Operand2;
            break;
        case '*' :  result = req.body.Operand1 * req.body.Operand2;
            break;
        case '/' :  result = req.body.Operand1 / req.body.Operand2;
            break;    
      }
      
      result = Math.round(result * 100) / 100;
      //res.type('json')  // This also will work similar to setting content type application/json
      res.writeHead(200, {
          'Content-type' : 'application/json'
      });
      res.end(JSON.stringify({ result : result}));    // We can't send JSON directly we have to change it to string using stringify
  });

app.listen(3001);
console.log("Server Listening on port 3001");
