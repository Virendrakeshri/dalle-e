import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";      //this is the create post page so openaiAPI is used to fetch the images
dotenv.config();
const router = express.Router();
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
	res.status(200).json({ message: "Hello from PixelWise" });
});

router.route("/").post(async (req, res) => {
	try {
		const { prompt } = req.body;  // fteching the data from frontend
		const aiResponse = await openai.createImage({  // we are generating a response
			prompt,
			n: 1,
			size: "1024x1024",
			response_format: "b64_json",
		});
		

		const image = aiResponse.data.data[0].b64_json;   //from that response we will generate the image
		

		res.status(200).json({ photo: image }); //sending this back to frontend
	} catch (error) {
		console.error(error);
		res.status(500).send(error?.response.data.error.message);
	}
});
export default router;
