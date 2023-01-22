import os
from dotenv import load_dotenv
import discord
import requests

load_dotenv()


intents = discord.Intents.default()
client = discord.Client(intents=intents)
guild = discord.Guild

messageHistory = []

@client.event
async def on_ready():
    global messageHistory
    data = []
    historySize = 1
    for guild in client.guilds:
        for channel in guild.channels:
            if channel.name == "discordtest":
                async for message in channel.history(limit=historySize):
                    if message.author != client.user:
                        pfp = message.author.avatar
                        data.append({
                                'id': message.id,
                                'postText': message.content,
                                'time': "message.created_at",
                                'userName': message.author.name,
                                "userIcon": pfp.url,
                                'images': []
                            })
                        if len(data) == historySize:
                            break
                    
    print(f'Sending the data {data}')
    requests.post("http://127.0.0.1:5000/api/messageHistory", json=data)


@client.event
async def on_message(message):
    print(message)
    global lastMessage
    if message.author == client.user:
        return
      
    data = []
    historySize = 1
    
    async for msg in message.channel.history(limit=historySize):
      if msg.author != client.user:

        pfp = message.author.avatar
        data.append({
					'id': msg.id,
					'postText': msg.content,
					'time': "message.created_at",
					'userName': message.author.name,
					"userIcon": pfp.url,
					'images': []
				})
    
    print(f'Sending the data {data}')
    requests.post("http://127.0.0.1:5000/api/sendNewMessage", json=data)
 

if __name__ == "__main__":
    client.run(os.environ["discord_bot_token"])
    
