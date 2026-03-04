import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [error,setError] = useState("")

  useEffect(() => {
    const getUsers = async() => {
      try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        if(!res.ok){
          throw new Error("Failed to fetch users")
        }
        const jsonData = await res.json()
        setUsers(jsonData)
      }catch(err){
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }

    getUsers()
  },[])

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{maxWidth: "600px", margin: "20px auto"}}>
      <h2 style={{textAlign: "center"}}>Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #fff",
            borderRadius: "8px",
            padding: "12px",
            margin: "10px 0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
          <p>{user.company.name}</p>
        </div>
      ))}
    </div>
  )
}

export default App
