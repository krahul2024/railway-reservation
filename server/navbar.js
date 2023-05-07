import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from './button.js';

const Nav = () => {
    let Links =[
      {name:"Home",link:"/"},
      {name:"Profile",link:"/"},
      {name:"Trains",link:"/"},
      {name:"Login",link:"/login"},
      {name:"Register",link:"/register"},
      {name:"About/Contact Us" ,link:"/about"}
    ]

    let [open,setOpen]=useState(false)

  return (
  	<section className="mb-10">
    <div className='shadow-md w-full fixed top-0'>
      <div className='md:flex items-center justify-between bg-slate-900 py-2 md:px-6 px-8'>
      <div className='font-bold text-xl cursor-pointer flex items-center
      text-sky-600'>
        <span className='text-3xl text-cyan-600 pt-2 px-1'>
       	<ion-icon name="train-outline"></ion-icon>
        </span>
        design.
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute text-cyan-700 right-6 top-4 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-8 absolute md:static bg-slate-900 md:z-auto z-[-2] left-0 w-full md:w-auto md:pl-0 pl-8 transition-all duration-1000 ease-in ${open ? 'top-14 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-6 text-md font-semibold md:my-0 my-4'>
              <NavLink to={link.link} className='text-gray-400 hover:text-cyan-600 duration-500'>{link.name}</NavLink>
            </li>
          ))
        }
        <Button>
          Get Started
        </Button>
      </ul>
      </div>
    </div>
    </section>
  )
}

export default Nav