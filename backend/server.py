from flask import Flask, request, redirect
import os
from dotenv import load_dotenv
import requests
from base64 import b64encode
import json
from flask_cors import CORS
import discord

app = Flask(__name__)

load_dotenv()
CORS(app)
intents = discord.Intents.default()
client = discord.Client(intents=intents)
guild = discord.Guild

messageHistory = []
lastMessage = None


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

if __name__ == "__main__":
    client.run(os.environ["discord_bot_token"])
    app.run(debug=True)
