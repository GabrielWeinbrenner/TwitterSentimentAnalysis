from twitter import *
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer

CONSUMER_KEY = "idwLB25vRVB4z0h1kyuTUogh3"
CONSUMER_SECRET = "qU637eORgneAiCxpkzLSp5jFdz8ghM3NcWLouFpwdmPoQ78rq0"
ACCESS_TOKEN = "891129619121926145-snKpmD1CLVgvQAhGXxzaQ9Z9ubYjOu8"
ACCESS_SECRET = "pHgGhFXVUE0ERDCjULzL2CSfvFUpLxnB8jRaqL2Fs5tZd"

t = Twitter(
    auth=OAuth(ACCESS_TOKEN, ACCESS_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
)

x = t.search.tweets(q="trump",tweet_mode='extended')
sentimentAnalysis = []
print(x)
print("------------------------------------")
for i in range(0, len(x['statuses'])):
    twitterTweet = x['statuses'][i]
    blob = TextBlob(twitterTweet['full_text'], analyzer=NaiveBayesAnalyzer())
    userTweet = "{}: {} ({}): {}".format(i, twitterTweet['user']['name'],twitterTweet['created_at'],twitterTweet['full_text'])
    print(
        userTweet + "\n"
    )
    sentimentAnalysis.append(blob.sentiment)

for i in sentimentAnalysis:
    print(i)

