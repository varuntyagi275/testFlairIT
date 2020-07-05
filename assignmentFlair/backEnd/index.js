const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const jwt= require('jsonwebtoken');
const JwtStrategy= require("passport-jwt").Strategy;
const passport= require("passport");
const randtoken= require("rand-token");
const cors= require("cors");
const ExtractJwt=require("passport-jwt").ExtractJwt;
const fs= require("fs");

const refreshTokens = {};
const SECRET = 'VERY_SECRET_KEY!';
const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if(expirationDate < new Date()) {
      return done(null, false);
    }
    done(null, jwtPayload);
  }))
  passport.serializeUser(function (user, done) {
    done(null, user.username)
  });


app.post('/login', function (req, res) { 
    const {username, password} = req.body;
    const user = { 
        'username': username, 
        'role': 'admin'
    };
    const token = jwt.sign(user, SECRET, { expiresIn: 600 }) 
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = username;
    res.json({jwt: token, refreshToken: refreshToken});
});


app.post('/login', function (req, res) { 
    const {username, password} = req.body;
    const user = { 
        'username': username, 
        'role': 'admin'
    };
    const token = jwt.sign(user, SECRET, { expiresIn: 600 }) 
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = username;
    res.json({jwt: token, refreshToken: refreshToken});
});

app.post('/logout', function (req, res) { 
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) { 
    delete refreshTokens[refreshToken];
  } 
  res.sendStatus(204); 
});

app.post('/refresh', function (req, res) {
    const refreshToken = req.body.refreshToken;
    

    if (refreshToken in refreshTokens) {
      const user = {
        'username': refreshTokens[refreshToken],
        'role': 'admin'
      }
      const token = jwt.sign(user, SECRET, { expiresIn: 600 });
      res.json({jwt: token})
    }
    else {
      res.sendStatus(401);
    }
});



app.get('/random', passport.authenticate('jwt'), function (req, res) {
    res.json({value: Math.floor(Math.random()*100) });
  })
  

  app.get('/product', passport.authenticate('jwt'), function (req, res) {
     fs.readFile('product.json','utf8', function (err, data){
      if(err){console.log(err)};
    
    console.log(data);
    var product=JSON.parse(data)
     res.json(product);
    });
     
     
  })


  
  app.post('/addProduct', passport.authenticate('jwt'), function(req, res){
    var dataServer= req.body
    console.log(dataServer)

    fs.readFile('product.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      obj = JSON.parse(data); //now it an object
           obj.push({id: dataServer.id, name:dataServer.name}); //add some data
      json = JSON.stringify(obj); //convert it back to json
    fs.writeFile("product.json",json,function readFileCallBack(err, data){
      if(err){console.log(err)};

      console.log("added")
    });
  }});
})



app.delete("/delete/:id", passport.authenticate("jwt"), function(req, res){

 
  const id=req.params.id; //ID got from Client side
 
  fs.readFile('product.json','utf8', function readFileCallBack(err,data){  //method to read json file

   if (err){
        console.log(err);
    } else {
   obj = JSON.parse(data); //now it an object
     var temp= obj.filter(function(v,i){
        console.log(v,i);
        return v.id!=id 
      })
      console.log(temp)
      json=JSON.stringify(temp);
     fs.writeFile("product.json",json,function readFileCallBack(err, data){
      if(err){console.log(err)};

      console.log("deleted");
      
    });
     res.json(json);
 }
  })
})


  app.listen(8000);
