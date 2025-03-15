import requests
from telegram import Update, Bot
from telegram.ext import Application, CommandHandler, CallbackContext

# Configurations
TELEGRAM_TOKEN = "8078244294:AAEFUP2w4CEkyGMGZLOvtnYusLm7mmt-LNU"
ETHERSCAN_API_KEY = "WB3K1TJN84NQFNM7J657VNZQ9JV8INNKN4"
BOT_CHAT_ID = "https://t.me/+guutfQoXJItkYWVk"  # Remplace par l'ID numérique du channel

# Initialisation du bot
bot = Bot(token=TELEGRAM_TOKEN)

async def get_new_meme_coins():
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address=0x...&apikey={ETHERSCAN_API_KEY}"
    response = requests.get(url).json()
    
    meme_coins = []
    for tx in response.get("result", []):
        if is_meme_coin(tx):
            meme_coins.append(tx)
    
    return meme_coins

def is_meme_coin(transaction):
    # Analyse basique (à améliorer avec des critères plus précis)
    return True

def alert_new_coins(context: CallbackContext):
    new_coins = get_new_meme_coins()
    if not new_coins:
        return
    
    for coin in new_coins:
        message = f"🚀 Nouveau Meme Coin détecté !\n\n💰 Token: {coin['hash']}\n📈 Volume: ...\n🔗 Adresse: {coin['to']}\n"
        context.bot.send_message(chat_id=BOT_CHAT_ID, text=message)

# Fonction de démarrage
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Bienvenue sur le bot de suivi des whales et des memes coins ! 🚀")

def main():
    application = Application.builder().token(TELEGRAM_TOKEN).build()

# Active le JobQueue
    job_queue = application.job_queue
    job_queue.run_repeating(alert_new_coins, interval=300, first=5)
    # Initialisation du bot avec la bonne méthode
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    # Ajouter les commandes
    application.add_handler(CommandHandler("start", start))

    # Tâche répétée pour vérifier les nouveaux meme coins toutes les 5 minutes
    application.job_queue.run_repeating(alert_new_coins, interval=300, first=5)

    # Lancer le bot
    application.run_polling()
    

if __name__ == "__main__":
    main()
