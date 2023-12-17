"use client"

import Head from 'next/head'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Login = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)

  const router = useRouter()

  const handleSignUp = async () =>{
    const res = await axios.post(`/api/user/register`,{
      name,
      email,
      password
    })
    if(res?.data){
      Cookies.set('user', res.data.token, {expires: 7})
      router.back()
    }
  }
  const handleLogin = async () =>{
    const res = await axios.post(`/api/user/login`,{
      email,
      password
    })
    if(res?.data){
      Cookies.set('user', res.data.token, {expires: 7})
      router.back()
    }
  }
  const handleToggle = () =>{
    setLogin(!login)
  }
  return (
    <div>
        <Head>
        <title>OYO - Login !</title>
      </Head>
      <div className='flex h-screen justify-center items-center relative bg-login-background bg-no-repeat bg-cover opacity-85'>
        <div className='absolute w-full top-10 px-20 flex items-center text-white'>
            <h2 className='text-5xl font-bold mr-5'>OYO</h2>
            <p className='font-bold text-2xl'>Hotels and homes across 800 cities, 24+ countries</p>
        </div>
        <div className='flex justify-center items-center w-9/12'>
        <div className='text-white'>
            <p className='font-bold text-5xl text-justify'>There's a smarter way to OYO around</p>
            <p className='text-2xl mt-5 text-justify'>
                Sign up with your phone number and get exclusive access to discounts and savings on OYO stays and with our many travel partners.
            </p>
        </div>
        <div className='ml-20 pb-40 w-10/12 border bg-slate-50'>
            <p className='h-10 flex items-center px-10 bg-gradient-to-r from-red-300 to bg-red-600 text-lg font-bold text-white'>Sign up & Get ₹500 OYO Money</p>
            <div className="px-10">
                <h3 className='text-5xl font-bold my-5'>Login / Signup</h3>
                <p className='font-bold text-lg mb-1'>Please enter your phone number to continue</p>
            </div>
            {
              login ? "" : (<input type='text' onChange={(e)=> setName(e.target.value)} placeholder='Enter your name...' className='outline-none border my-3 border-black px-3 py-1 w-96 h-10 mx-5'/>)
            }
            <input type='email' onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email...' className='outline-none border my-3 border-black px-3 py-1 w-96 h-10 mx-5'/>
            <input type='password' onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your password...' className='outline-none border my-3 border-black px-3 py-1 w-96 h-10 mx-5'/>
            <button type="submit" onClick={login ? handleLogin : handleSignUp} className='w-96 mx-5 h-14 text-lg font-bold bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white my-5 rounded-lg'>{login ? "Log In" : "Sign Up"}</button>
            <p className='my-1 text-xl'>
                <span className='mx-10'>{login ? "Don't have an account ?" : "Already have an account ?"}</span>
                <span onClick={handleToggle} className='ml-1 border-b-2 border-red-500 text-red-600 pb-1 hover:cursor-pointer'>{login ? "Sign Up" : "Log In"}</span>
            </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
