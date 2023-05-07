import React , { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import "./styles.css"

const Home = () => {

	const classList = [{
		value: "first_ac",label:"AC-1"
	},{
		value:"second_ac",label:"AC-2"
	},{
		value:"third_ac",label:"AC-3"
	},{
		value:"sleeper",label:"Sleeper"
	}
	]

	const stationList = [{
		value:"patna", label:"Patna"
	},{
		value:"new_delhi", label:"New Delhi"
	},{
		value:"guwahati", label:"Guwahati"
	},{
		value:"dibrugarh", label:"Dibrugarh"
	},{
		value:"anand_vihar",label:"Anand Vihar"
	},{
		value:"kanpur", label:"Kanpur Central"
	}
	]

	const [selectedClasses , setSelectedClasses] = useState([])

	const [selectedStations , setSelectedStations] = useState([])

	

	return (
		<div className="flex items-center justify-center mb-64">
		<div>
			<div className="p-4 mb-32 text-center">
				<h1 className="text-2xl text-cyan-600 font-bold text-center">Add train..</h1>
				<span className="text-cyan-600 italic">Enter following details for adding new train...</span>
			</div>

			<form action="">
				<div className="p-4">
					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Name of the train</h1>
					<input className=" w-full mx-2 bg-slate-800 rounded-lg p-2.5 mb-6 outline-0" type="text" placeholder="eg. Rajdhani express" name="train_name"/>
					
					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Number of the train</h1>
					<input className=" w-full mx-2 bg-slate-800 rounded-lg p-2.5 mb-6 outline-0" type="text" placeholder="eg. 13253" name="train_number"/>
					
					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Train type</h1>
					<select name="train_type" id="" className="p-3 ml-2.5 mb-6 rounded-lg bg-gray-800 outline-0">
						<option value="express">Express</option>
						<option value="superfast_express">Superfast Express</option>
						<option value="other">Others..</option>
					</select>

					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Ticket classes</h1>
					<MultiSelect 
						className="bg-gray-800 ml-2 rmsc text-sky-400 mb-6"
						options = {classList}
						value={selectedClasses}
						onChange={setSelectedClasses}
						labelledBy="select classes.."
					/>
					
					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Name of start station</h1>
					<input className=" w-full mx-2 bg-slate-800 rounded-lg p-2.5 mb-6 outline-0" type="text" placeholder="eg. New Delhi" name="station_count"/>
					
					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Name of last station</h1>
					<input className=" w-full mx-2 bg-slate-800 rounded-lg p-2.5 mb-6 outline-0" type="text" placeholder="eg. Dibrugarh" name="station_count"/>

					<h1 className="p-2 ml-1 text-lg font-bold text-sky-400">Add intermediate stations..</h1>
					<MultiSelect 
						className="bg-gray-800 ml-2 rmsc text-sky-400 mb-6"
						options = {stationList}
						value={selectedStations}
						onChange={setSelectedStations}
						labelledBy="select stations.."
					/>

				</div>

			</form>
		</div>
			

		</div>

		)
}


export default Home ;
