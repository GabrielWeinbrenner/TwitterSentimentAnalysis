import React from 'react';
import axios from 'axios';
import TweetForm from './TweetForm';
class App extends React.Component{
  state = {
    tweets: {}
  }
  getTweets(subject){
    axios.get("http://127.0.0.1:5000/search", { params: { subject } }).then(
      res => {
        const t= res.data; 
        console.log(t);
        this.setState({tweets: t})
      }
    )
  }


  handleSubmit = (typeVal) => {
    this.getTweets(typeVal);
  }
 
  render(){
    return(
        <div>
          <TweetForm sub={this.handleSubmit}/>
        </div>
    );
  }
}

export default App;
