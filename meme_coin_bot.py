import requests
import telegram
from telegram import Update, Bot
from telegram.ext import Application, CommandHandler, CallbackContext, JobQueue
from telegram.ext import Application, MessageHandler, filters

# Configurations
TELEGRAM_TOKEN = "8078244294:AAEFUP2w4CEkyGMGZLOvtnYusLm7mmt-LNU"
ETHERSCAN_API_KEY = "WB3K1TJN84NQFNM7J657VNZQ9JV8INNKN4"
BOT_CHAT_ID = "-1002670843813"  # Remplace par l'ID numérique du channel

# Initialisation du bot
bot = Bot(token=TELEGRAM_TOKEN)
application = Application.builder().token(TELEGRAM_TOKEN).build()
# Fonction pour récupérer les nouveaux meme coins
def get_new_meme_coins():
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address=0x...&apikey={ETHERSCAN_API_KEY}"
    response = requests.get(url).json()
    
    meme_coins = []
    for tx in response["result"]:
        if is_meme_coin(tx):
            meme_coins.append(tx)
    
    return meme_coins

# Vérification si c'est un meme coin
def is_meme_coin(transaction):
    return True  # Ici, tu peux ajouter une analyse plus poussée

# Envoi d'alerte des nouveaux coins détectés
async def alert_new_coins(context: CallbackContext):
    new_coins = get_new_meme_coins()
    if not new_coins:
        return
    
    for coin in new_coins:
        message = f"🚀 Nouveau Meme Coin détecté !\n\n💰 Token: {coin['hash']}\n📈 Volume: ...\n🔗 Adresse: {coin['to']}\n"
        await context.bot.send_message(chat_id=BOT_CHAT_ID, text=message)

# Commande /start
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Bienvenue sur votre bot de suivi des whales et des memes coins ! 🚀")

# Commande /whales pour suivre les transactions des whales
async def whales(update: Update, context: CallbackContext):
    await update.message.reply_text("🔍 Suivi des transactions des whales en cours...")

# Commande /meme pour afficher les derniers memes coins
async def meme(update: Update, context: CallbackContext):
    new_coins = get_new_meme_coins()
    if not new_coins:
        await update.message.reply_text("Aucun nouveau meme coin pour l'instant.")
        return
    
    message = "🚀 Liste des nouveaux Meme Coins :\n"
    for coin in new_coins:
        message += f"💰 Token: {coin['hash']}\n🔗 Adresse: {coin['to']}\n\n"
    
    await update.message.reply_text(message)
    
# Commande /alerts pour activer les notifications
async def alerts(update: Update, context: CallbackContext):
    context.job_queue.run_repeating(alert_new_coins, interval=300, first=5)
    await update.message.reply_text("🔔 Alertes activées ! Vous recevrez des notifications sur les nouveaux coins.")

# Commande /copytrade pour activer la copie des transactions des whales
async def copytrade(update: Update, context: CallbackContext):
    await update.message.reply_text("🤖 Copie automatique des transactions des whales activée !")
# Fonction pour gérer les messages du channel
async def handle_channel_messages(update: Update, context: CallbackContext):
    await update.message.reply_text("Message reçu dans le channel ! 🚀")

# Ajout du handler pour écouter les messages dans le channel
application.add_handler(MessageHandler(filters.Chat(int(BOT_CHAT_ID)), handle_channel_messages))

application.add_handler(MessageHandler(filters.Chat(BOT_CHAT_ID), handle_channel_messages))
# Fonction principale
def main():
    application = Application.builder().token(TELEGRAM_TOKEN).build()
    
    # Ajout des commandes
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("whales", whales))
    application.add_handler(CommandHandler("meme", meme))
    application.add_handler(CommandHandler("alerts", alerts))
    application.add_handler(CommandHandler("copytrade", copytrade))
    
    # Lancer le bot
    application.run_polling()

if __name__ == "__main__":
    main()
