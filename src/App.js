import React,{ Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey:'56e259ba4243489eb3d30b3afddf90ec'
});

const particlesOptions={
     Particles:{
                
                number:{
                    value:2000,
                    density:{
                        enable:true,
                        value_area:100 
                    }
                }
                  
       }
    
}
class App extends Component { 
    constructor() {
        super();
        this.state={
            input:'',
            imageurl:'',
            box:{},
        }
        // this.displayFaceBox = this.displayFaceBox.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    displayFaceBox = (box) => {
        console.log(box,"ads");
        this.setState({box:box});
     }
    calculateFacelocation = ( data ) => 
     {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      console.log("face",clarifaiFace);
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height= Number(image.height);
       // console.log(width);
       // console.log(height);
        return {
            leftcol :clarifaiFace.left_col*width,
            toprow : clarifaiFace.top_row*height,
            rightcol: width - (clarifaiFace.right_col*width),
            bottomrow: height - (clarifaiFace.bottom_row*height),
         }
    }

    onInputChange = ( event ) =>
    {
        this.setState({input :event.target.value});
    }
    onSubmit = ()=>
    {
        this.setState({imageurl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL ,this.state.input).then(
    //'a403429f2ddf4b49b307e318f00e528b'    //    Clarifai.COLOR_MODEL
    ( response ) => {
      console.log( response.outputs[0].data.regions[0].region_info.bounding_box);  
      this.displayFaceBox( this.calculateFacelocation( response));
    }
    ).catch(err =>console.log);        
    }
    render(){
     return ( <div className="App">
      <Particles className="particles"
       params={particlesOptions} />
        <Navigation /> 
        <Logo /> 
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} /> 
        <FaceRecognition box={ this.state.box }  imageurl={this.state.imageurl} />    
        </div>
    ); 
 }
}
export default App;