import requests
from telegram import Update, Bot
from telegram.ext import Application, CommandHandler, CallbackContext

# Configurations
TELEGRAM_TOKEN = "TON_TOKEN_ICI"
ETHERSCAN_API_KEY = "TA_CLE_ETHERSCAN_ICI"
BOT_CHAT_ID = "-100XXXXXXXXXX"  # Remplace par l'ID numérique du channel

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

async def alert_new_coins(context: CallbackContext):
    new_coins = await get_new_meme_coins()
    
    if not new_coins:
        return  # Aucun coin trouvé
    
    for coin in new_coins:
        message = (
            f"🚀 **Nouveau Meme Coin détecté !**\n\n"
            f"💰 **Token:** {coin['hash']}\n"
            f"📈 **Volume:** ...\n"
            f"🔗 **Adresse:** {coin['to']}\n"
        )
        await context.bot.send_message(chat_id=BOT_CHAT_ID, text=message, parse_mode="Markdown")

# Fonction de démarrage
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Bienvenue sur le bot de suivi des whales et des memes coins ! 🚀")

def main():
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
