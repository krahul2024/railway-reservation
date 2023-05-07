import React from 'react'

const Home = () => {
	return (
		<div className="flex items-center justify-center">

			<div className="md:mt-8 mt-6 p-2">
			
			{/*for searching trains on the basis of all stations*/}
				<div className="items-center p-2 text-sky-600 md:mb-52 mb-28 text-center">
					<h1 className="text-4xl font-bold">Search for trains..</h1>
					<span className="italic">search trains using station names or train names..</span>
				</div>
				<form action="">
					<div className="w-full text-md text-center mb-12">
						<h1 className="text-cyan-400 font-bold mb-3">Search using station names....</h1>
						<input className="md:mr-6 mr-2 bg-gray-800 p-3 shadow-md mx-4 outline-0 rounded-lg" type="text" placeholder="boarding station"/>
						<span className="text-sky-600">to</span>
						<input className="md:ml-6 ml-2 bg-gray-800 p-3 shadow-md mx-4 outline-0 rounded-lg"  type="text" placeholder="destination station"/>
					</div>
						{/*serching using train name or number*/}
					<div className="w-full text-md text-center mb-12">
						<h1 className="text-cyan-400 font-bold mb-3">Search using station train name/number....</h1>
						<input className="md:mr-6 mr-2 bg-gray-800 p-3 shadow-md mx-4 outline-0 rounded-lg" type="text" placeholder="train number"/>
						<span className="text-sky-600">or</span>
						<input className="md:ml-6 ml-2 bg-gray-800 p-3 shadow-md mx-4 outline-0 rounded-lg"  type="text" placeholder="train name"/>
					</div>

						{/*searching using date */}
					<div className="w-full text-md text-center mb-24">
						<h1 className="text-cyan-400 font-bold text-md mb-4">Filter by date</h1>
						<input className="p-3 px-16 rounded-lg bg-gray-800 hover:bg-cyan-800 text-lg text-sky-400" type="date" placeholder="date" />
					</div>
					<div className="text-center text-md text-indigo-400">
						<label className="cursor-pointer">
						  <input type="checkbox" className=" accent-cyan-500" checked/> Accept all the terms and conditions..
						</label>
						<button className="w-1/2 p-2 rounded-full bg-sky-900 mt-3 hover:bg-cyan-800">
								Go
							</button>

					</div>
					
				</form>

			</div>
		</div>

		)
}


export default Home ;
