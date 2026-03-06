
```javascript
import React from "react";
import axios from "axios";
import { Button, Input, Card } from "../components/ui";
```

export default function HabitFeature() {

```javascript
const [habits, setHabits] = useState([]);
const [newHabit, setNewHabit] = useState("");
```


const API = "http://localhost:3000"

async function loadHabits() {

  try {

    const res = await fetch(`${API}/habits`)
    const data = await res.json()

    setHabits(data)

  } catch (err) {

    console.error(err)

  }

}

async function addHabit() {

  if (!newHabit.trim()) return

  try {

    const res = await fetch(`${API}/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newHabit })
    })

    const data = await res.json()

    setHabits([...habits, data])
    setNewHabit("")

  } catch (err) {

    console.error(err)

  }

}

async function toggleHabit(id, completed) {

  try {

    await fetch(`${API}/habits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })

    setHabits(
      habits.map(h =>
        h.id === id ? { ...h, completed: !completed } : h
      )
    )

  } catch (err) {

    console.error(err)

  }

}

async function deleteHabit(id) {

  try {

    await fetch(`${API}/habits/${id}`, {
      method: "DELETE"
    })

    setHabits(habits.filter(h => h.id !== id))

  } catch (err) {

    console.error(err)

  }

}

useEffect(() => {
  loadHabits()
}, [])


```jsx
return (
  <Card>
    <Input placeholder="Add habit" />
    <ul>
      {/* Habit items will be listed here */}
    </ul>
    <Button onClick={() => {}}>Add Habit</Button>
  </Card>
);
```

}
