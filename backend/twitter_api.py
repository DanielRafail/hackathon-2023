import requests
import os
import json

# To set your environment variables in your terminal run the following line:
# export 'BEARER_TOKEN'='<your_bearer_token>'
bearer_token = os.environ['TWITTER_BEARER_TOKEN']
print(bearer_token)

# Optional params: start_time,end_time,since_id,until_id,max_results,next_token,
# expansions,tweet.fields,media.fields,poll.fields,place.fields,user.fields
query_params = {
    'exclude': 'replies', 'tweet.fields':
    'created_at,public_metrics,geo',
    'expansions': 'attachments.media_keys',
    'media.fields': 'media_key,preview_image_url,type,url'
}


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


def get_google_searches():
    user_id = "20536157"
    search_url = "https://api.twitter.com/2/users/" + user_id + "/tweets"

    json_response = connect_to_endpoint(search_url, query_params)

    return json_response
