import React, { useState, useEffect } from "react"

export default function HabitFeature() {

  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState("")

  async function loadHabits() {

    const res = await fetch("/habits")

    const data = await res.json()

    setHabits(data)

  }

  async function addHabit() {

    if (!newHabit) return

    await fetch("/habits",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ name:newHabit })
    })

    setNewHabit("")

    loadHabits()

  }

  async function toggleHabit(id,completed){

    await fetch(`/habits/${id}`,{
      method:"PUT",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ completed: !completed })
    })

    loadHabits()

  }

  useEffect(()=>{
    loadHabits()
  },[])

  return (

    <div style={{maxWidth:600,margin:"40px auto",fontFamily:"sans-serif"}}>

      <h1>Habit Tracker</h1>

      <div style={{display:"flex",gap:10}}>

        <input
          value={newHabit}
          onChange={e=>setNewHabit(e.target.value)}
          placeholder="New habit"
        />

        <button onClick={addHabit}>
          Add
        </button>

      </div>

      <ul style={{marginTop:20}}>

        {habits.map(habit=>(
          <li key={habit.id}>

            <label>

              <input
                type="checkbox"
                checked={habit.completed}
                onChange={()=>toggleHabit(habit.id,habit.completed)}
              />

              {habit.name}

            </label>

          </li>
        ))}

      </ul>

    </div>

  )

}