module.exports = (app) => {
	/**
   * @swagger
   * /api/app/next:
   *   get:
   *     description: Takes the name of your app, and returns data for the next app in the database, based on priority
	*     parameters:
   *       - name: x-api-key
   *         description: api key
   *         in: header
   *         required: true
	*       - name: body
	*         in: body
	*         required: true
	*         schema:
	*           type: object
	*           properties:
	*             name:
	*               type: string
	*               example: ExampleAppName
   *     tags:
   *       - app
   *     responses:
   *       200:
   *         description: A result with the next app
	*       400:
	*         description: Missing data, or database error
   */
	app.get('/api/app/next', async (req, res) => {
		if (req.body.name === undefined) {
			return res.status(400).send({
				"message": "you need to specify name in body"
			});
		}

		const nextAppResult = await AppModel.nextApp(req.body.name);
		if(nextAppResult.length === 0) {
			return res.status(400).send('Found zero apps with that name');
		}
		if(nextAppResult.length !== 1) {
			return res.status(400).send('Found more than one app with that name');
		}

		res.send({
			nextApp: nextAppResult[0]
		});
	});
};
