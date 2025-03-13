import logging
import os
from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext

# Configure logging
logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)

# Récupérer le Token depuis Railway
TOKEN = os.getenv("BOT_TOKEN")

# Fonction de démarrage
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Bienvenue sur votre bot de suivi des whales et des memes coins ! 🚀")

def main():
    # Initialisation du bot avec la nouvelle méthode
    application = Application.builder().token(TOKEN).build()

    # Ajouter la commande /start
    application.add_handler(CommandHandler("start", start))

    # Lancer le bot
    application.run_polling()

if __name__ == "__main__":
    main()
