import requests
import os

# To set your environment variables in your terminal run the following line:
# export 'BEARER_TOKEN'='<your_bearer_token>'
bearer_token = os.environ['TWITTER_BEARER_TOKEN']
print(bearer_token)

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r

def connect_to_endpoint(url, params):
    response = requests.get(url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()
    
def replace_keys(data):
    newData = []

    media_dict = {}
    user_dict = {}

    for media in data["includes"]["media"]:
        if media["type"] == "video":
            media_dict[media["media_key"]] = media["preview_image_url"]

        if media["type"] == "photo":
            media_dict[media["media_key"]] = media["url"]

    for user in data["includes"]["users"]:
        user_dict[user["id"]] = user

    for post in data["data"]:
        user = user_dict[post["author_id"]]
        
        formatted_post = {
            "id": post["id"],
            "userName": user["name"],
            "userHandler": user["username"],
            "userIcon": user["profile_image_url"],
            "time": "9:00pm", #post["created_at"],
            "postText": post["text"],
            "numberOfComments": post["public_metrics"]["reply_count"],
            "numberOfShares": post["public_metrics"]["retweet_count"],
            "numberOfLikes": post["public_metrics"]["like_count"],
            "images": [],
            "source": "Twitter"
        }

        if "attachments" in post:
            for attachment in post["attachments"]["media_keys"]:
                formatted_post["images"].append(media_dict[attachment])

        newData.append(formatted_post)

    return newData


def get_google_searches():
    # Optional params: start_time,end_time,since_id,until_id,max_results,next_token,
    # expansions,tweet.fields,media.fields,poll.fields,place.fields,user.fields
    query_params = {
        'query':'#googlelayoffs -is:retweet -is:reply',
        'tweet.fields':'created_at,public_metrics,geo',
        'expansions': 'attachments.media_keys,author_id',
        'media.fields': 'media_key,preview_image_url,type,url',
        'user.fields':'profile_image_url',
        'max_results':30,
        'sort_order':'relevancy'
    }
    
    search_url = "https://api.twitter.com/2/tweets/search/recent"

    json_response = connect_to_endpoint(search_url, query_params)
    json_response = replace_keys(json_response)

    return json_response
