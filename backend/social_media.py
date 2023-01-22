import time
from dotenv import load_dotenv
import requests
load_dotenv()

from twitter_api import get_google_searches

def send_data(route, data):
    requests.post("http://127.0.0.1:5000/api/{}".format(route), json=data)

def send_twitter_data():
    twitter_google_data = get_google_searches()
    send_data("twitter", twitter_google_data)

while True:
    time.sleep(5.0)
    send_twitter_data()
    


