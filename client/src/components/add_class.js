import React , {useState , useEffect } from 'react'
import {NavLink , useNavigate , useLocation } from 'react-router-dom'
import baseUrl from './baseUrl.js'

const AddClass = () => {
	const navigate = useNavigate()
	const location = useLocation() 
	const classItem = location?.state?.class 
	const id = classItem?._id
	const [classType , setClassType] = useState(classItem?.classType || '')
	const [fairRatio , setFairRatio] = useState(classItem?.fairRatio || '')
	const [totalSeats , setTotalSeats] = useState(classItem?.totalSeats || '') 

	const addClass = async(e) => {
				e.preventDefault() 

		try{
			const response = await fetch(`${baseUrl}/train/add_class`,{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					id,classType , fairRatio , totalSeats
				})
			})

			const result = await response.json() 

			console.log(result) 
			if(!result.success) throw new Error(result.msg)
			alert('Class added successfully')
			navigate("/info")

		}
		catch(error) {
			console.log(error) 
			error.message?window.alert(error.message):window.alert("There was an error loggin you in! Please try again later.")
		}
	}

	return (<>
		
		<div className="flex flex-col justify-center p-4 h-screen items-center">
			
			<div className="flex flex-col px-12 py-6 bg-slate-900 rounded-lg shadow-xl shadow-slate-900 brightness-125">
				<div className="flex flex-col items-center text-center py-12 px-4">
					<div className="p-1 text-lg font-semibold text-sky-500 ">
						{classItem?'Update Class':'Add Class'} 
					</div>
					<span className="text-indigo-600 italic">Enter class information you want to {classItem?'update':'add'}</span>
				</div>
				
				<label className="flex flex-col px-12 py-6">
					<span className="text-cyan-500 ">
						Enter Name of the class
					</span>
					<input type="text" value={classType} onChange = {(e) => setClassType(e.target.value)}
						className="outline-0 bg-transparent w-4/5 px-4 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
					/>
				</label>

				<label className="flex flex-col px-12 py-6">
					<span className="text-cyan-500 ">
						Enter fair ratio (Rs. per km)
					</span>
					<input type="text" value={fairRatio} onChange = {(e) => setFairRatio(e.target.value)}
						className="outline-0 bg-transparent w-4/5 px-4 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
					/>
				</label>

				<label className="flex flex-col px-12 py-6">
					<span className="text-cyan-500 ">
						Enter no. of seats or capacity
					</span>
					<input type="text" value={totalSeats} onChange = {(e) => setTotalSeats(e.target.value)}
						className="outline-0 bg-transparent w-4/5 px-4 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
					/>
				</label>
				
				<div className="flex items-start mt-5 gap-4 items-center justify-center">
					<button onClick = { (e) => addClass(e)}
						className="flex items-center cursor-pointer px-16 py-1.5 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 font-semibold text-sky-700 rounded-full w-fit"
						>{classItem?'Update':'Add'}</button>
					<NavLink to="/info"
						className="flex items-center cursor-pointer px-16 py-1.5 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 font-semibold text-sky-700 rounded-full w-fit"
						>Cancel</NavLink>
				</div>
			</div>
		</div>



	</>)
}


export default AddClass 