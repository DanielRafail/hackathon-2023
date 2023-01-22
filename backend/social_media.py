from reddit_api import get_hot_subreddit_posts
from twitter_api import get_google_searches
import time
from dotenv import load_dotenv
import requests
import random

load_dotenv()


while True:
    twitter_data = get_google_searches()
    print("Got {} twitter entries".format(len(twitter_data)))
    reddit_data = get_hot_subreddit_posts("google", 1)
    print("Got {} reddit entries".format(len(reddit_data)))

    combined_posts = list(twitter_data + reddit_data)
    print("Total number of posts: {}".format(len(combined_posts)))
    random.shuffle(combined_posts)
    requests.post("http://127.0.0.1:5000/api/social_media_posts",
                  json=combined_posts)

    time.sleep(500.0)
