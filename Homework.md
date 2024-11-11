//Postman Url Test
app.post("/user/:userID/:password",(req,res)=>{
    console.log(req.params); //http://localhost:3000/user/23/dkahkah output:{ userID: '23', password: 'dkahkah' }
    res.send("Data successfully deleted to the Database")
})

app.post("/user",(req,res)=>{
    console.log(req.query); //http://localhost:3000/user?soumya=34 ouput:{ soumya: '34' }
    res.send("Data successfully deleted to the Database")
})

