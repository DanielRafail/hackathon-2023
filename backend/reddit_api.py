from dotenv import load_dotenv
import praw
import os

load_dotenv()

creds = {
    "client_id":os.environ["REDDIT_CLIENT_ID"],
    "client_secret":os.environ["REDDIT_CLIENT_SECRET"],
    "user_agent":"Revibe by u/OatmealCookies14",
}

def get_hot_subreddit_posts(subreddit, number_posts=10):    
    reddit = praw.Reddit(
        client_id="2ET4oGAUuwSasDV89Ll42w",
        client_secret="wvIx6FCgsKlWPHXh7wfkNapsLkEy6w",
        user_agent="Revibe by u/OatmealCookies14",
    )

    if reddit.read_only is False:
        raise Exception("Reddit API not connected")
    
    top_posts = []

    for submission in reddit.subreddit("google").hot(limit=number_posts):
        data = {
            'id':submission.id,
            'title':submission.title,
            'description':submission.selftext,
            'userName':submission.author.name,
            'userHandler':submission.author.name,
            'numberOfLikes':submission.score,
            'numberOfComments':submission.num_comments,
            'numberOfShares':0,
            'time':submission.created_utc,
            'source':'Reddit',
        }
        top_posts.append(data)
        print(data)

    return top_posts