import os
from dotenv import load_dotenv
import discord
import requests
from helper.helper import datetime_from_utc_to_local

load_dotenv()


intents = discord.Intents.default()
client = discord.Client(intents=intents)
guild = discord.Guild

messageHistory = []

@client.event
async def on_ready():
    global messageHistory
    data = []
    historySize = 5
    for guild in client.guilds:
        for channel in guild.channels:
            if channel.name == "discordtest":
                async for message in channel.history(limit=historySize):
                    if message.author != client.user:
                        setData(data, message)
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
        setData(data, msg)
    
    print(f'Sending the data {data}')
    requests.post("http://127.0.0.1:5000/api/sendNewMessage", json=data)
    
def setData(data, message):
    pfp = message.author.avatar
    localCreatedAt = datetime_from_utc_to_local(message.created_at)
    time = str(localCreatedAt)[0:str(localCreatedAt).index(".")].split(" ")
    imgs = []
    if len(message.attachments) > 0:
        for image in message.attachments:
            imgs.append(image.url) 
    data.append({
					'id': message.id,
					'postText': message.content,
					'time': time[1] + " " +  time[0],
					'userName': message.author.name,
					"userIcon": pfp.url if pfp.url else "https://support.discord.com/hc/user_images/l12c7vKVRCd-XLIdDkLUDg.png",
					'images': imgs
				})
 

if __name__ == "__main__":
    client.run(os.environ["discord_bot_token"])
    
