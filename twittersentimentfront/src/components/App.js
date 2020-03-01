import React from 'react';
import axios from 'axios';
import TweetForm from './TweetForm';
import ReactSpeedometer from "react-d3-speedometer";

class App extends React.Component{
  state = {
    tweets: [],
    positiveSentiment: 0,
    negativeSentiment: 0,
    overall: 0,
    subject: "",
    submitClicked: false,
    Anger: 0,
    Joy: 0,
    Fear: 0,
    Sadness: 0,
    Analytical: 0,
    Confident: 0,
    Tentative: 0
  }
  getTweets(subject){
    let lengthOfResponse = 0;
    axios.get("http://127.0.0.1:5000/search", {
        params: { subject },
        onDownloadProgress: event => {
            const pastLength = lengthOfResponse;
            lengthOfResponse = event.target.response.length;
            const currentTweet = JSON.parse(event.target.response.substring(pastLength));

            // console.log(currentTweet)

            this.setState(({ tweets, ...rest }) => ({
                tweets: tweets.concat([currentTweet]),
                ...rest,
                subject: subject,
                positiveSentiment: (this.state.positiveSentiment + currentTweet.sentiment[1])/(this.state.tweets.length+1),
                negativeSentiment: (this.state.negativeSentiment + currentTweet.sentiment[2])/(this.state.tweets.length+1),
                overall: this.state.positiveSentiment - this.state.negativeSentiment,
            })
            )
            try {
                this.setState({
                    Anger: (currentTweet.tone[0].tone_name == "Anger" ? this.state.Anger+1 : this.state.Anger+0),
                    Joy: (currentTweet.tone[0].tone_name == "Joy" ? this.state.Joy+1 : this.state.Joy+0),
                    Fear: (currentTweet.tone[0].tone_name == "Fear" ? this.state.Fear+1 : this.state.Fear+0),
                    Sadness: (currentTweet.tone[0].tone_name == "Sadness" ? this.state.Sadness+1 : this.state.Sadness+0),
                    Analytical: (currentTweet.tone[0].tone_name == "Analytical" ? this.state.Analytical+1 : this.state.Analytical+0),
                    Confident: (currentTweet.tone[0].tone_name == "Confident" ? this.state.Confident+1 : this.state.Confident+0),
                    Tentative: (currentTweet.tone[0].tone_name == "Tentative" ? this.state.Tentative+1 : this.state.Tentative+0),
    
                });
            } catch (error) {
                console.log(error);                
            }
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
    this.setState({
        submitClicked: true
    })
    this.getTweets(typeVal);
  }
  returnList = () => {
    return this.state.tweets.map(tweet => {

        console.log(this.state.overall);
        return (
            <li className="item-list" key={tweet.id}>
                    <img src={tweet.profile_URL}></img>
                    <h3 className="user">{tweet.user}</h3>
                    <p>{tweet.tweet}</p>                
            </li>
        )
    })
  }
/* 
Anger 
Joy
Fear
Sadness
Analytical 
Confident
Tentative
*/
  renderForm = () => {
      return(
        <div>
            <TweetForm sub={this.handleSubmit}/>
        </div>
      );
  }
  render(){
      if(this.state.submitClicked === false){
        return(
            this.renderForm()
        );
      }else{
        return(
            <div>
                <h1 className="heading-tweets">Searching tweets for {this.state.subject ? this.state.subject : "...."}</h1>
                <div className="speedometer"> 
                    <ReactSpeedometer 
                    needleTransitionDuration={10000} 
                    needleTransition="easeElastic" 
                    value={this.state.overall} 
                    minValue={-1} 
                    maxValue={1}
                    />
                </div>
                <div className="container">
                    <ul className="social-posts">
                        {this.returnList()}
                    </ul>
                </div>
            </div>
        );
      }

  }
}

export default App;
