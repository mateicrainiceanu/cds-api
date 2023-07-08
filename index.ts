import { app, port, openai, defaultSettingsForOAIReq } from "./middleware";

app.get("/", (req, res) => {
    res.json({ answ: "Hello from express from typesxript" });
})

app.get("/oaitest", async (req, res) => {

    const response = await openai.createCompletion({
        ...defaultSettingsForOAIReq,
        prompt: "Are you awake?",
        max_tokens: 10,
    });

    const choice = response.data.choices[0];

    const splitText = choice.text?.split("\n") || [];

    res.json({ ...choice, splitText: splitText });
})

app.post("/swot", async (req, res) => {
    const { strengths, weeknesses, threats, opportunities } = req.body;

    var prompt = `
        Am făcut următoarea analiză SWOT asupra mea. Ce mă sfătuiești? Răspunde-mi în maxim 300 de cuvinte.
        puncte tari: ${strengths};
        puncte slabe: ${weeknesses};
        oportunități: ${opportunities};
        amenințări: ${threats},
    `;

    const response = await openai.createCompletion({
        ...defaultSettingsForOAIReq,
        prompt: prompt,
        max_tokens: 1000,
    });

    const choice = response.data.choices[0];

    const splitText = choice.text?.split("\n") || [];

    res.json({ ...choice, splitText: splitText });

})

app.listen(port, () => {
    console.log("App started on port " + port);
})