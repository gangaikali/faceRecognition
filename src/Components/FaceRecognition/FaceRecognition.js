import React from 'react';
// import './'

const FaceRecognition = ({ imageurl }) =>{
	return(
		<div className="center">
		  <img id="inputimage" alt=" " src={imageurl} width="350px" height="auto" />
		</div>
		);
} 	 	

export default FaceRecognition;