import React from 'react' 
const Image = ({src , ...rest}) => {
	return (<> 
		<img src={src} ...rest />
	</>)
}

export default Image 