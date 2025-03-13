from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext
import logging
import os

# Configure logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Get bot token from Railway environment variables
import os
TOKEN = os.getenv("BOT_TOKEN")

def start(update: Update, context):
    update.message.reply_text("Bienvenue sur votre bot de suivi des whales et des memes coins !")

def main():
    from telegram.ext import Updater
    from telegram.ext import CommandHandler
    
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher
    
    # Command handler
    dp.add_handler(CommandHandler("start", start))
    
    # Start the bot
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
