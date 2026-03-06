
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

let habits = []

// API routes

app.get("/health",(req,res)=>{
  res.json({status:"ok"})
})

app.get("/habits",(req,res)=>{
  res.json(habits)
})

app.post("/habits",(req,res)=>{

  const habit = {
    id: Date.now(),
    name: req.body.name,
    completed:false
  }

  habits.push(habit)

  res.status(201).json(habit)

})

app.put("/habits/:id",(req,res)=>{

  const id = Number(req.params.id)

  habits = habits.map(h =>
    h.id === id ? {...h,completed:req.body.completed} : h
  )

  res.json({success:true})

})

app.delete("/habits/:id",(req,res)=>{

  const id = Number(req.params.id)

  habits = habits.filter(h => h.id !== id)

  res.json({success:true})

})


// Serve frontend build

const frontendPath = path.join(__dirname,"../frontend/dist")

app.use(express.static(frontendPath))

app.get("*",(req,res)=>{
  res.sendFile(path.join(frontendPath,"index.html"))
})


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Server running on port",PORT)
})
