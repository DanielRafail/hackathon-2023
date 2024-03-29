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
    
    print(reddit.read_only)
    top_posts = []

    for submission in reddit.subreddit(subreddit).hot(limit=number_posts):
        data = {
            'id':submission.id,
            'title':submission.title,
            # 'postText':submission.selftext,
            'userName':submission.author.name,
            'userIcon':submission.author.icon_img,
            'userHandler':submission.author.name,
            'numberOfLikes':submission.score,
            'numberOfComments':submission.num_comments,
            'numberOfShares':0,
            'time':"submission.created_utc",
            'source':'Reddit',
            'images':[],
        }
        top_posts.append(data)
        print(data)

    return top_posts