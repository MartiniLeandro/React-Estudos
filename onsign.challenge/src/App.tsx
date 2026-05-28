import { useEffect, useState } from 'react'
import './App.css'
import api from './services/Api'

interface UserSuggestedResponse {
  id: number,
  name: string,
  suggestedFriends: string[],
  suggestedInterests: string[]
}

function App() {
  const [dataUsers, setDataUsers] = useState<UserSuggestedResponse[]>([])

  useEffect(() => {
    getDataUsers()
  }, [])

  async function getDataUsers(){
    try{
      const response = await api.get<UserSuggestedResponse[]>("/datas")
      setDataUsers(response.data)
    }catch(error: any){
      console.log("Error fetching data: " + error)
    }
  }

  function toggleSortName() {
      const reversedUsers = [...dataUsers].reverse();
      setDataUsers(reversedUsers)
  }

  return (
   <div className='w-full h-screen bg-linear-to-br from-blue-700 to-blue-500 flex flex-col justify-center items-center text-white'>

    <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold'>OnSign <span className='text-orange-400'>Challenge</span></h1>
      <p className='mt-3 text-blue-100'>View candidates and their suggested friends and interests</p>
    </div>

    <div className='w-full max-w-6xl px-6 bg-white rounded-2xl shadow-2xl mt-10'>
      <div className='flex justify-end'>
        <button onClick={toggleSortName} className='bg-orange-400 p-1.5 rounded-md cursor-pointer mr-11 my-4'>reverse order</button>
      </div>
      <table className='w-full table-fixed border-separate border-spacing-0 text-black'>
        <thead>
          <tr className='text-left text-zinc-500 text-sm border-b border-zinc-200'>
            <th className='w-[10%] pb-4 pl-2 font-semibold'>ID</th>
            <th className='w-[20%] pb-4 font-semibold'>Name</th>
            <th className='w-[35%] pb-4 font-semibold'>Suggested Friends</th>
            <th className='w-[35%] pb-4 font-semibold'>Suggested Interests</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers.map(user => (
            <tr className='border-b border-zinc-200 hover:bg-zinc-50 transition-colors' key={user.id}>
              <td className='py-5 pl-2 text-blue-600 font-semibold'>{user.id}</td>
              <td className='py-5 font-medium'>{user.name}</td>
              <td className='py-5 text-zinc-600'>{user.suggestedFriends.join(", ")}</td>
              <td className='py-5 text-zinc-600'>{user.suggestedInterests.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default App
