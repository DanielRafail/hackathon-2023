from flask import Flask, request, redirect
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
import json
from flask_cors import CORS
from helper.helper import is_json, verifyAPIResponse

app = Flask(__name__)

load_dotenv()
CORS(app)

channels = []


# get the log of messages from discord
@app.route("/api/discord/getMessages", methods=["GET"])
def getMessages():
    url = "https://discord.com/api/channels/{channelId}/messages".format(channelId = "")
    headers = {
        "Authorization": "Bearer {token}".format(token=os.environ["discord_token_code"])
    }
    pass

# get new discord messages after getMessages is reached
@app.route("/api/discord/ping", methods=["GET"])
def getNewMessages():
    pass

def getDiscordChannels():
    pass

@app.route("/api/discord/code", methods=["GET", "POST"])
def getDiscordCode():
    if request.args.get('code'):
        os.environ['discord_token_code'] = request.args.get('code')
    return redirect(os.environ['url_prefix'] + "/api/discord/token", code=302)
    
@app.route("/api/discord/token", methods=["GET", "POST"])
def getDiscordToken():
    getDiscordAuthenticationToken()
    return redirect(os.environ['url_prefix'], code=302)

# get the authentication token for discord api
def getDiscordAuthenticationToken():
    url = "https://discord.com/api/v10/oauth2/token"
    headers = {
        'content-type' : 'application/x-www-form-urlencoded'
    }
    data = {
        "client_id": os.environ["discord_token_id"],
        "client_secret": os.environ["discord_token_secret"],
        "grant_type": "authorization_code",
        "code": os.environ['discord_token_code'],
        "redirect_uri": os.environ["url_prefix"],
        "scope": "identify"
    }    
    req = requests.post(url, data=data, headers=headers)
    verifyAPIResponse(req, "getDiscordAuthenticationToken")
    os.environ["discord_token"] = req.json()['access_token']
    os.environ["discord_refresh_token"] = req.json()['refresh_token']
    return None
  
# renew the discord authentication token
def renewDiscordToken():
    url = "https://discord.com/api/v10/oauth2/token"
    data = {
        'client_id': os.environ["discord_token_id"],
        'client_secret': os.environ["discord_token_secret"],
        'grant_type': 'refresh_token',
        'refresh_token': os.environ["discord_refresh_token"]
    }
    headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    req = requests.post(url, data=data, headers=headers)
    verifyAPIResponse(req, "renewDiscordToken")
    print(req.text)
    return None
    


if __name__ == "__main__":
    app.run(debug=True) 
    