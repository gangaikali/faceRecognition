import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({  box , imageurl }) =>{
	// console.log(box.leftcol,box.bottomrow);
	return(
		<div className="center" >
		  <img  id="inputimage" alt="aghjk" src={imageurl} width="400px" height="auto" />

		<div className="bounding-box" style={ { top:box.toprow,right:box.rightcol,bottom:box.bottomrow,left:box.leftcol } }></div>
		</div>
		);
} 	 	
export default FaceRecognition;