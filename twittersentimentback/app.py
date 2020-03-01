from flask import Flask, render_template, request
from twitter import *
import requests
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json



CONSUMER_KEY = "idwLB25vRVB4z0h1kyuTUogh3"
CONSUMER_SECRET = "qU637eORgneAiCxpkzLSp5jFdz8ghM3NcWLouFpwdmPoQ78rq0"
ACCESS_TOKEN = "891129619121926145-snKpmD1CLVgvQAhGXxzaQ9Z9ubYjOu8"
ACCESS_SECRET = "pHgGhFXVUE0ERDCjULzL2CSfvFUpLxnB8jRaqL2Fs5tZd"

t = Twitter(
    auth=OAuth(ACCESS_TOKEN, ACCESS_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
)

app = Flask(__name__)

authenticator = IAMAuthenticator('83BDRwZHLtHmvuZzTGkCE3ESOCuLS3zLs8lhzWXg2YT8')
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)


@app.route('/search', methods=['GET'])
def returnSentiment():
    subject = request.args.get('subject', 'My Default')
    # with open("trumpTweets.json", 'r') as myfile:
    #     data=myfile.read()
    # return data
    return getTweets(subject)
 


if __name__ == '__main__':
    app.run(port=3000, debug=True, host='0.0.0.0')

def getTweets(sub):
    x = t.search.tweets(q=sub,tweet_mode='extended')

    sentTweets = []
    for i in range(0, len(x['statuses'])):
        twitterTweet = x['statuses'][i]
        
        tweets = json.dumps({
            "user": twitterTweet['user']['name'],
            "creation": twitterTweet['created_at'],
            "tweet": twitterTweet['full_text'],
            "sentiment": getSentiment(twitterTweet['full_text']),
            "tone": getTone({twitterTweet['full_text']})

        })
        setTweets.append(tweets)
    return setTweets
def getSentiment(tweet):
    blob = TextBlob(tweet, analyzer=NaiveBayesAnalyzer())
    return blob.sentiment

def getTone(tweet):
    headers = {
    'Content-Type': 'application/json',
    }

    params = (
        ('version', '2017-09-21'),
    )   
    #set dat to twitter json
    #json.dumps() to convert json to srtring
    #data = open('/Users/dz/Downloads/tone.json', 'rb').read()
    response = requests.post('https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/2cef28f5-fb6e-4229-8a35-2728190981a5/v3/tone', headers=headers, params=params, data=tweet, auth=('apikey', '83BDRwZHLtHmvuZzTGkCE3ESOCuLS3zLs8lhzWXg2YT8'))
    return response.json()
