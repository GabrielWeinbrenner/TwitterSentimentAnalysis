import React from 'react';
import axios from 'axios';
import TweetForm from './TweetForm';
import ReactSpeedometer from "react-d3-speedometer";

class App extends React.Component{
  state = {
    tweets: [],
    positiveSentiment: 0,
    negativeSentiment: 0,
    overall: 0.5
  }
  getTweets(subject){
    let lengthOfResponse = 0;
    axios.get("http://127.0.0.1:5000/search", {
        params: { subject },
        onDownloadProgress: event => {
            const pastLength = lengthOfResponse;
            lengthOfResponse = event.target.response.length;
            const currentTweet = JSON.parse(event.target.response.substring(pastLength));

            console.log(currentTweet)

            this.setState(({ tweets, ...rest }) => ({
                tweets: tweets.concat([currentTweet]),
                ...rest,
                positiveSentiment: (this.state.positiveSentiment + currentTweet.sentiment[1]),
                negativeSentiment: this.state.negativeSentiment + currentTweet.sentiment[2],
                overall: Math.abs(this.state.positiveSentiment - this.state.negativeSentiment)
            }),

            )
            console.log(this.state)
        }
    }).then(response => console.log('Done!'))
    // axios.get("http://127.0.0.1:5000/search", {responseType: 'stream', adapter: httpAdapter})
    //     .then((response) => {
    //         const stream = response.data;
    //         // const tweets = []

    //         stream.on('data', (chunk /* chunk is an ArrayBuffer */) => {
    //             console.log(chunk);
    //             // tweets.push(chunk)

    //         });
    //         stream.on('end', () => {
    //             console.log("We're done!")
    //         });
    //     });
    // axios({
    //     method: 'get',
    //     url: 'http://127.0.0.1:5000/search',
    //     responseType: 'stream'
    // })
    // .then(response => {
    //     const stream = response.data;
    //     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    // });
          
    // axios.get("http://127.0.0.1:5000/search", { params: { subject } }).then(
    //   res => {
    //     const t= res.data; 
    //     console.log(t);
    //     this.setState({tweets: t})
    //   }
    // )
  }


  handleSubmit = (typeVal) => {
    this.getTweets(typeVal);
  }
  returnList = () => {
    return this.state.tweets.map(tweet => {

        console.log(this.state.overall);
        return (
            <div className="item" key={tweet.id}>
                <div>
                    <h1>{tweet.user}</h1>
                    <p>{tweet.tweet}</p>
                </div>
                
            </div>
        )
    })
  }
  render(){
    return(
        <div>
          <TweetForm sub={this.handleSubmit}/>
          {this.returnList()}
          <ReactSpeedometer 
            needleTransitionDuration={10000} 
            needleTransition="easeElastic" 
            value={this.state.overall} 
            minValue={0} 
            maxValue={1}
        />
        </div>
    );
  }
}

export default App;
