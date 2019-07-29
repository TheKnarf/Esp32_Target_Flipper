const express = require('express'),
		bodyParser = require('body-parser'),
		swaggerUi = require('swagger-ui-express'),
		swaggerJSDoc = require('swagger-jsdoc'),
		path = require("path");

const setupExpress = () => {
	const app = express();

	/* Setup swagger */
	const swaggerDocument = swaggerJSDoc({
		swaggerDefinition: {
			info: {
				title: 'Fake api',
				version: '0.1.0',
				description: 'Description TBD',
			},
			host: 'localhost:3000/',
		},
		apis: [ './src/api/*.js' ],
	});
	app.use(
		'/api-docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocument, { explorer: true })
	);
	app.get('/swagger.json', (req, res) => {
		res.send(swaggerDocument);
	});

	/* setup other stuff */
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.set('case sensitive routing', true);
	app.use((req, res, next) => {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	const api_handlers = require('require-all')(__dirname + '/api');
	Object
		.keys(api_handlers)
		.forEach(handle => {
			api_handlers[handle](app);
		});

	return app;
};

module.exports = {
	setupExpress
};
