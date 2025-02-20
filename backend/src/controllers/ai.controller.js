const aiServices = require('../services/ai.services');

module.exports.getResponse = async (req, res)=>{

    const code = req.body.code;

if(!code) {
    return  res.status(400).json({
        message: "Prompt is required"
    })
}

const response = await aiServices(code);
res.send(response)
}