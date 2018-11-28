var express		=	require('express');
var bodyParser		=	require('body-parser');
var session 		=	require('express-session');
var webRoutes		=	require('./routes/web');
var apiRoutes 		=	require('./routes/api');
var app				=	express();
var config 			=	require('./config/request');

// error handler
app.use(function(req, res, next) {
	if(config.MARKETPLACE_ID === '' || config.SECRET === '') {
		res.send('MarketplaceId and secret must be set with your marketplace API credentials');
	} else{
		next();
	}
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(session({
	cookieName: 'session',
	secret: 'secret',
	duration: 30 * 60 * 1000,
	sctiveDuration: 50 * 60 * 1000,
	cookie: { maxAge: 24 * 60 * 60 * 1000 },
	resave: true,
	saveUninitialized: true
}));

app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/config', express.static('config'));
app.use('*', function(req, res) {
	res.render('app/404error');
});
app.listen(process.env.PORT || 3000, function(err, req, res) {
	if(err) {
		res.send('There was no endpoint listening');
	} else{
		console.log('server started on port: ', (process.env.PORT || 3000));
	}
});
