import React, { useState } from "react"
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { ButtonWarn } from "../components/ButtonWarning";
import { Button } from "../components/Button";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const  Signin  = () => {
      const [username , setUsername] = useState('');
      const [password , setPassword] = useState('');
      const navigate = useNavigate();

      return(
            <div className="bg-slate-300 h-screen flex justify-center ">
                 <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading label={"Sign in"} />
                         <InputBox onChange={(e) => {
                              setUsername(e.target.value); 
                         }} label={"Email"} placeholder={"example@gmail.com"}  />
                         <InputBox onChange={(e) => {
                              setPassword(e.target.value); 
                         }} label={"Password"} placeholder={"Pasword"}/>
                         <Button onClick={async () => {
                              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                   username,
                                   password
                              });
                              localStorage.setItem(response.data.token)
                              navigate("/dashboard")
                         }} label={"Sign in"}/>
                         <ButtonWarn label={"Don't have an account ? "} buttonText={"Sign Up"} to={"/signup"} />
                    </div>
                 </div>
            </div>
      )

}         
