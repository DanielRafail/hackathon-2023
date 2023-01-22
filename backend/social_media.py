import time
from dotenv import load_dotenv
import requests
import random 

load_dotenv()

from twitter_api import get_google_searches
from reddit_api import get_hot_subreddit_posts

while True:
    twitter_data = get_google_searches()
    reddit_data = get_hot_subreddit_posts("google", 30)

    combined_posts = list(twitter_data + reddit_data)
    random.shuffle(combined_posts)
    requests.post("http://127.0.0.1:5000/api/social_media_posts", json=combined_posts)
    
    time.sleep(300.0)