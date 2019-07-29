const { setupExpress } = require('./setupExpress'),
	program = require('commander');

program
	.version('0.1.0')
	.option('-p, --port [port]', 'Webserver port', 3000)
	.parse(process.argv);

const listen = (app, port) => new Promise((resolve, reject) => {
	app.listen(port, () => {
		resolve();
	});
});

(async () => {
	const app = setupExpress();
		
	await listen(app, program.port);
	console.log(`App up on http://localhost:${program.port}/`);
	console.log(`API doc at http://localhost:${program.port}/api-docs/`);
})();
