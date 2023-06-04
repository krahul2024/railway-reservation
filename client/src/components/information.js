import React , { useState , useEffect} from 'react'  
import {NavLink , useNavigate , useLocation } from 'react-router-dom'

// this page will be displayed only if the logged in person has admin access
// contents are list of stations , trains , classes


const Information = () => {
	return (<>

		<div className='flex flex-col items-center justify-center p-8'>
			<button>Show All Trains</button>
			<button>Show All Classes</button>
			<button>Show all Stations</button>
		</div>

	 </>)
}

export default Information