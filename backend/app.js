const exprees = require('express');
const aiRoutes = require('./src/routes/ai.routes');
const app = exprees()
const cors = require('cors')

app.use(cors())

app.use(exprees.json())


app.get('/', (req,res)=>{
    res.send('Hello World!')
})
app.use('/ai', aiRoutes)


module.exports = app; 