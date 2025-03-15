import requests
import telegram
from telegram import Update, Bot
from telegram.ext import Application, CommandHandler, CallbackContext

# Configurations
TELEGRAM_TOKEN = "8078244294:AAEFUP2w4CEkyGMGZLOvtnYusLm7mmt-LNU"
ETHERSCAN_API_KEY = "WB3K1TJN84NQFNM7J657VNZQ9JV8INNKN4"
BOT_CHAT_ID = "https://t.me/+guutfQoXJItkYWVk"

# Initialisation du bot
bot = Bot(token=TELEGRAM_TOKEN)

def get_new_meme_coins():
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address=0x...&apikey={ETHERSCAN_API_KEY}"
    response = requests.get(url).json()
    
    meme_coins = []
    for tx in response["result"]:
        if is_meme_coin(tx):
            meme_coins.append(tx)
    
    return meme_coins

def is_meme_coin(transaction):
    # Ici, on pourrait analyser le nom, le volume et d'autres paramètres
    return True

def alert_new_coins(update: Update, context: CallbackContext):
    new_coins = get_new_meme_coins()
    if not new_coins:
        update.message.reply_text("Aucun nouveau meme coin intéressant pour le moment.")
        return
    
    for coin in new_coins:
        message = f"🚀 Nouveau Meme Coin détecté !\n\n💰 Token: {coin['hash']}\n📈 Volume: ...\n🔗 Adresse: {coin['to']}\n"
        context.bot.send_message(chat_id=BOT_CHAT_ID, text=message)
# Fonction de démarrage
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Bienvenue sur votre bot de suivi des whales et des memes coins ! 🚀")

def main():
    # Initialisation du bot avec la nouvelle méthode
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    # Ajouter la commande /start
    application.add_handler(CommandHandler("start", start))

    # Lancer le bot
    application.run_polling()

if __name__ == "__main__":
    main()
# Lancement du bot
application = Application.builder().token(TELEGRAM_TOKEN).build()
application.add_handler(CommandHandler("start", alert_new_coins))
application.run_polling()
