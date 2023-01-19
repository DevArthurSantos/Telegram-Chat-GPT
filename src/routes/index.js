import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const routes = new Router();

routes.post("/api", async (req, res) => {
  const { API_KEY } = process.env;
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const { text } = req.body;

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Chave de API OpenAI não configurada!",
      },
    });
    return;
  }

  if (text.length === 0 || !text) {
    res.status(400).json({
      error: {
        message: "Por favor insira um valor válido",
      },
    });
    return;
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
    });
    let resposta = completion.data.choices[0].text;
    res.status(200).json({ text: resposta });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Erro com a solicitação de API OpenAI: ${error.message}`);
      res.status(500).json({
        error: {
          message: "Houve um erro durante sua solicitação.",
        },
      });
    }
  }
});

export default routes;
