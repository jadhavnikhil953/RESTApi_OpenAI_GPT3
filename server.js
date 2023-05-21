var express = require('express');
require('dotenv').config()
var app = express();
const {Configuration, OpenAIApi } = require('openai');

app.get('/getGPTResponse',(req, res) => {
    let prompt = req.query.question
    const basePath = process.env.BASE_PATH
    const model = process.env.DEPLOYMENT_MODEL

    const azureOpenAiChatGPT = async (prompt) => {
    const configuration = new Configuration({
        basePath: basePath + model,
        apiKey: process.env.API_KEY,
    })
    const openai = new OpenAIApi(configuration)
    const completion = await openai.createCompletion(
        {
        model,
        prompt,
        max_tokens: 1000,
        temperature: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0.5,
        best_of: 1,
        stop: null,
        },
        {
        headers: {
            'api-key': process.env.API_KEY,
        },
        params: { 'api-version': process.env.API_VERSION },
        }
    )
    return completion
    }
    azureOpenAiChatGPT(prompt).then((data) => {
        res.send({success:true,message:data.data.choices[0].text});
    }).catch((err) =>{
        console.log(err);
        res.send({success:false,message:err});
    });
 });


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})