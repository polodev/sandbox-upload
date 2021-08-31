// showLastCommitMessageForThisLibrary.js
import { create } from 'apisauce'
import React from 'react';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// define the api
var token = '9|kPzvm8LstNSHQDZabIoFLtftBx727GiPH420mPZ7';
const api = create({
  baseURL: 'http://bimafy.test/api/v2',
  baseURL: 'https://sandbox.bimabd.com/api/v2',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}` ,
  },
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selectedFile: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.sendFile = this.sendFile.bind(this)
  }
  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }
  componentDidMount() {
    api
    .get('/get-demo-image')
    .then(response => {
      if(response.data) {
        console.log('response', response.data.data)
        this.setState({
          demoImage: response.data.data
        })
      }
    })
    .then(console.log)

  }

  sendFile() {
    const data = new FormData() 
    data.append('demo_image', this.state.selectedFile)
    api
    .post('/post-demo-image', data)
    .then(response => {
      if(response.data) {
        console.log('api response', response.data.data)
        this.setState({
          demoImage: response.data.data
        })
      }
    })
    .then(console.log)
  }

  render() {
    console.log('state', this.state);
    return (
      <div>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <br /><br />

                    <h3 className="text-white">React File Upload Example - Tutsmake.com</h3>
                    <br />
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="text-white">Select File :</label>
                            <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-dark" onClick={()=>this.sendFile()}>Save</button>
                        </div>
                    </div>
            </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            {
              this.state.demoImage ? 
              <img className="img-fluid img-thumbnail" src={this.state.demoImage} alt="no image found" /> : 'no image'
            }
          </div>
        </div>
    </div>
      
    );
  }
}

export default App;