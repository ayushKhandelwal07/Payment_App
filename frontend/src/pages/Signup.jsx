import { useState } from "react"

import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { ButtonWarn } from "../components/ButtonWarning" 
import { Button } from "../components/Button"

import { useNavigate } from "react-router-dom"
import axios  from  "axios"


export const Signup = () => {
      const [firstname , setFirstname] = useState('')
      const [lastname , setLastname] = useState('')
      const [username , setUsername] = useState('')
      const [password , setPassword] = useState('')
      const navigate = useNavigate();

      return (
      <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                  <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading label="Signup"/>
                        <SubHeading label={"Enter your infromation to create an account"}/>
                        <InputBox onChange={(e) => {  
                              setFirstname(e.target.value);
                        }} label="Firstname" placeholder="Firstname" /> 
                        <InputBox onChange={(e) => {
                              setLastname(e.target.value);
                        }} label="Lastname" placeholder="Lastname" />
                        <InputBox onChange={(e) => {
                              setUsername(e.target.value);
                        }} label="Email" placeholder="example@gmail.com" />
                        <InputBox  onChange={(e) => {
                              setPassword(e.target.value)
                        }} label="Password" placeholder="Password" />
                        <div className="pt-4">
                              <Button onClick={async () => {
                                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                          username,
                                          lastname,
                                          firstname,
                                          password,

                                    });
                                    localStorage.setItem("token", response.data.token )
                                    navigate("/dashboard")
                                    }} label={"Sign up"}/>
          
                        </div>
                        <ButtonWarn label="Already have an account"  buttonText="Sign in" to={"/signin"} />
                  </div>
            </div>
      </div>
      )
}