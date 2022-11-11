import React, { useEffect, useState } from 'react';
import { db } from "./firebase-config";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";



function App() {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    alert("You must reload the page")
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
    alert("You must reload the page")
  }

  const reduceUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newReducer = {age: age - 1}
    await updateDoc(userDoc, newReducer)
    alert("You must reload the page")
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
    alert("You must reload the page")
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id })));
    }
    getUsers()
  }, []);

  return ( 
    <div className="bg-white w-full h-screen flex justify-center">
      <div className="p-4 flex flex-col ">
        <div className="my-6 items-center ">
          <h1 className="text-center mb-6 text-2xl font-bold text-[#D5D4D8] border-b-2 border-[#D5D4D8]">To Do App</h1>
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="border-2 border-[#D5D4D8] rounded-lg p-2" 
              type="text" 
              placeholder="Name..." 
              onChange={(event) => {
                setNewName(event.target.value)
              }} 
            />
            <input 
              className="border-2 border-[#D5D4D8] rounded-lg p-2"
              type="number" 
              placeholder="Age..." 
              onChange={(event) => {
                setNewAge(event.target.value)
              }}
            />
          </div>
          <button 
            className=" text-white px-3 py-2 rounded-lg border-2 bg-blue-200 hover:bg-blue-300 hover:border-blue-300 mt-3 flex mx-auto" 
            onClick={createUser}
          >
            Create User
          </button>
        </div>
        <div >
          {users.map((user) => {
            return (
              <div className="my-4 p-2 bg-gray-100 drop-shadow-2xl">
                <h1 className="text-xl">Name: {user.name}</h1>
                <h1>Age: {user.age}</h1>
                <div className="flex">
                  <button 
                    className=" bg-blue-200 rounded-lg px-2 py-1 mt-1 mr-3"
                    onClick={() => {
                      updateUser(user.id, user.age)
                      }}
                  >
                    Incrase Age
                  </button>
                  <button 
                    className=" bg-blue-300 rounded-lg px-2 py-1 mt-1 mr-3"
                    onClick={() => {
                      reduceUser(user.id, user.age)
                      }}
                  >
                    Reduce Age
                  </button>
                  <button 
                    className="bg-red-300 rounded-lg px-2 py-1 mt-1 ml-auto"
                    onClick={() => {
                    deleteUser(user.id)
                    }}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
