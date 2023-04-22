import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: userName,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:4000/user/signup", data)
      .then((res) => {
        alert("Registration is Success")
        console.log(res);
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/login");
      })
      .catch((err) => {
        alert("Email is already Exist!")
        console.log(err);
      });
  }
  return (
    <div>
      <Navbar />

      <div className=" w-screen h-[80vh] flex  justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col  w-[50%]  space-y-4  "
        >
          <h1 className="text-xl text-center ">🆂🅸🅶🅽🆄🅿</h1>
          <div className="flex flex-col ">
            <label className="text-xl ">𝐔𝐬𝐞𝐫 𝐍𝐚𝐦𝐞</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              required="Please enter Your Name"
              placeholder="Enter Your User Name"
              className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xl ">𝐄𝐦𝐚𝐢𝐥</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required="Please enter Your Email"
              placeholder="Enter Your Email"
              className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xl ">𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              required="Please enter Your Password"
              placeholder="Enter Your Password"
              className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-300 py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
}

export default Register;
