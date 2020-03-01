from flask import Flask, render_template, request
from twitter import *
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
import json



CONSUMER_KEY = "idwLB25vRVB4z0h1kyuTUogh3"
CONSUMER_SECRET = "qU637eORgneAiCxpkzLSp5jFdz8ghM3NcWLouFpwdmPoQ78rq0"
ACCESS_TOKEN = "891129619121926145-snKpmD1CLVgvQAhGXxzaQ9Z9ubYjOu8"
ACCESS_SECRET = "pHgGhFXVUE0ERDCjULzL2CSfvFUpLxnB8jRaqL2Fs5tZd"

t = Twitter(
    auth=OAuth(ACCESS_TOKEN, ACCESS_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
)
sentimentAnalysis = []

app = Flask(__name__)


@app.route('/search', methods=['GET'])
def returnSentiment():
    subject = request.args.get('subject', 'My Default')
    with open("trumpTweets.json", 'r') as myfile:
        data=myfile.read()


    return data
 


if __name__ == '__main__':
    app.run(port=3000, debug=True, host='0.0.0.0')

def getTweets(sub):
    x = t.search.tweets(q=sub,tweet_mode='extended')

    tweets = {}
    for i in range(0, len(x['statuses'])):
        twitterTweet = x['statuses'][i]
        
        tweets = json.dumps({
            "user": twitterTweet['user']['name'],
            "creation": twitterTweet['created_at'],
            "tweet": twitterTweet['full_text'],
            "sentiment": getSentiment(twitterTweet['full_text'])
        })
        print(tweets)
    return tweets

def getSentiment(tweet):
    blob = TextBlob(tweet, analyzer=NaiveBayesAnalyzer())
    return blob.sentiment


