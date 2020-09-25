const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars')
//const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session');
const app = express();
const path = require('path')
// const db = require('./server/db');
// const moment = require('moment');
// const passport = require('passport');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))
//app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized: true }));
app.use('/build/',express.static(path.join(__dirname,'node_modules/three/build')));
app.use('/jsm/',express.static(path.join(__dirname,'node_modules/three/examples/jsm')));

//app.use(passport.initialize());
//app.use(passport.session());



const PORT=process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default',
  helpers: {formatDate: function (date, format) {
            var mmnt = moment(date);
            return mmnt.format(format);
          },
          ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
          }
  },
//  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');


app.get('', function (req, res) {
  let data = {
    title: 'GreenSentinel - Accueil',
    user:req.user,
  }
  res.render('index.hbs', data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
