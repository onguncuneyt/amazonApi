const { apiReq, readFile, compareProducts } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		const { asins, ratio, fbaStatus, rating } = req.body;

		if (!asins || !ratio || fbaStatus == null || !rating) return res.sendStatus(400);

		const [usa, ca] = await Promise.all([apiReq('amazon.com', asins), apiReq('amazon.ca', asins)]);

		//var comparedProducts = compareProducts(usa, ca, ratio, fbaStatus, rating);

		res.send(await compareProducts(usa, ca, ratio, fbaStatus, rating));
	},
};
