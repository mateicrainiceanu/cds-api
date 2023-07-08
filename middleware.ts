import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";

require('dotenv').config()

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    organization: process.env.OAI_ORGANISATION,
    apiKey: process.env.OAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const defaultSettingsForOAIReq = {
    model: "text-davinci-003",
    max_tokens: 10 * 50,
    temperature: 0
}

export { app, port, openai, defaultSettingsForOAIReq };