import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [usersList, setusersList] = useState([]);
  const [newtitle, setnewtitle] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4000/api/list").then((response) => {
      setusersList(response.data);
    });
  }, []);

  const handleSubmit = () => {
    Axios.post("http://localhost:4000/api/insert", {
      name: name,
      age: age,
      title: title,
      gender: gender,
    });
    setusersList([
      ...usersList,
      {
        name: name,
        title: title,
      },
    ]);
  };

  const handleDelete = (user) => {
    Axios.delete(`http://localhost:4000/api/delete/${user}`);
  };

  const handleUpdate = (user) => {
    Axios.put("http://localhost:4000/api/update", {
      name: user,
      title: newtitle,
    });
    setnewtitle("");
  };

  return (
    <div>
      <div className="w-96 h-72 border-solid border-2 border-black rounded-lg m-auto mt-20">
        <div>
          <h1 className="text-4xl mt-4 mb-4 w-max m-auto">CRUD PRACTICE</h1>
        </div>
        <div className="flex mt-3 ml-4">
          <div className="w-28">
            <p>Enter Name:</p>
          </div>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="rounded-lg border-solid border-2 border-black pl-1"
          />
        </div>
        <div className="flex mt-3 ml-4">
          <div className="w-28">
            <p>Enter Age:</p>
          </div>
          <input
            type="text"
            name="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            className="rounded-lg border-solid border-2 border-black pl-1"
          />
        </div>
        <div className="flex mt-3 ml-4">
          <div className="w-28">
            <p>Enter Title:</p>
          </div>
          <input
            type="text"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="rounded-lg border-solid border-2 border-black pl-1"
          />
        </div>
        <div className="flex mt-3 ml-4">
          <div className="w-28">
            <p>Enter Gender:</p>
          </div>
          <select
            name="gender"
            className="rounded-lg border-solid border-2 border-black"
            value="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="ml-4">
          <button
            type="submit"
            className="rounded-lg border-solid bg-sky-500/100 text-neutral-50 w-20 h-10 mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {usersList.map((val) => {
            return (
              <h1 className="mt-10 border-solid border-2 border-black rounded-lg pl-4 h-20 mr-4">
                User: {val.name} | Title: {val.title}
                <br />
                <button
                  className="w-10 border-solid border-2 border-sky-500/100 rounded-lg bg-sky-500/100 text-neutral-50"
                  onClick={() => {
                    handleUpdate(val.name);
                  }}
                >
                  Edit
                </button>
                <input
                  type="text"
                  className="rounded-lg border-solid border-2 border-black pl-1 ml-4"
                  name="title"
                  id="updateInput"
                  onChange={(e) => {
                    setnewtitle(e.target.value);
                  }}
                />
                <button
                  className="w-14 border-solid border-2 border-red-500/100 rounded-lg bg-red-500/100 text-neutral-50 ml-4"
                  onClick={() => {
                    handleDelete(val.name);
                  }}
                >
                  Delete
                </button>
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
