import { Component } from 'react'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { transcript: '' };
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;  // Continue capturing
    this.recognition.interimResults = true;  // Show interim results
  }

  componentDidMount() {
    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      this.setState({ transcript });
      console.log("SD",transcript)
    };
  }

  handleStart = () => {
    this.recognition.start();
  }

  handleStop = () => {
    
    this.recognition.stop();
    
  }

  handleSave = async() => {
    const{transcript}=this.state
    
    console.log("End",transcript);
    const options={
      mode: 'no-cors',
      method:"POST",
      headers:{
        "Content-Type":'text/plain'
      },
      body:transcript
  }
    const response= await fetch('http://localhost:3000/save-speech',options)
    // const data=await response
    console.log("Da",response.message);
  }

  handleNew=()=>{
    this.setState({transcript:''})
  }

  render() {
    return (
      <div>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleStop}>Stop</button>
        <button onClick={this.handleSave}>Save</button>
        <button onClick={this.handleNew}>Add New Entry</button>
        <p>{this.state.transcript}</p>
      </div>
    );
  }
}

export default App
