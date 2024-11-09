const express = require('express')
const app = express()

app.get("/user",(req,res)=>{
    res.send({"firstname":"soumya","lastname":"behera"})
})

app.post("/user",(req,res)=>{
    res.send("Data successfully saved to the Database")
})

app.delete("/user",(req,res)=>{
    res.send("Data successfully deleted to the Database")
})


//this will match all the HTTP method API calls to Test
app.use('/hello', function (req, res) {
    res.send('Hello hello hello')
})



app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...");
})