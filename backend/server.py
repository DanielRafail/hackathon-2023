from flask import Flask, request, redirect
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
import json
from flask_cors import CORS
import discord
from flask import abort
from flask_socketio import SocketIO,emit
import threading
import random

load_dotenv()

from twitter_api import get_google_searches

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'

load_dotenv()
CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

intents = discord.Intents.default()
client = discord.Client(intents=intents)
guild = discord.Guild

messageHistory = []
lastMessage = None

@socketio.on("connect")
def connected():
	"""event listener when client connects to the server"""
	print(request.sid)
	print("client has connected")
	emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)


@client.event
async def on_ready():
    global messageHistory
    data = []
    historySize = 4
    for guild in client.guilds:
        for channel in guild.channels:
            async for message in channel.history(limit=historySize):
                if message.author != client.user:
                    pfp = message.author.avatar
                    data.append(
                        {
                            'content': message.content,
                            'time': message.created_at,
                            'author': message.author.name,
                            "avatar": pfp
                        })
                    if len(data) == historySize:
                        break
    messageHistory = data


@client.event
async def on_message(message):
    global lastMessage
    if message.author == client.user:
        return
    data = None
    historySize = 1
    async for msg in message.channel.history(limit=historySize):
        if msg.author != client.user:
            pfp = message.author.avatar
            data.append(
                {
                    'content': message.content,
                    'time': message.created_at,
                    'author': message.author.name,
                    "avatar": pfp
                })
            if len(data) == historySize:
                break
    lastMessage = data
    
app.route("/api/discord/getHistory", methods=["GET"])
def getHistory():
    global messageHistory
    return messageHistory

@app.route("/twitter", methods=["GET"])
def get_twitter_searches():
    if request.method == 'GET':
        return get_google_searches()

if __name__ == "__main__":
    client.run(os.environ["discord_bot_token"])
    app.run(debug=True, host='0.0.0.0') 
    socketio.run(app, debug=True)
