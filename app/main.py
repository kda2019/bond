from flask import Flask, request, redirect
import requests

app = Flask(__name__)

token = '5690431214:AAGo6k6QETMz9mApzuMGZiYU03Bkfp4iywA'
chat_id = '-661936876'

@app.route('/api/send_form_data', methods=['POST'])
def send_form_data():
    data = request.form
    text = 'SITE: bond\n\n' + '\n'.join([f'{k} - {v}' for k, v in data.items()])
    requests.get(f'https://api.telegram.org/bot{token}/sendMessage?chat_id={chat_id}&text={text}')
    return redirect('/Thank-you.html', code=302)

@app.route('/api/send_form_data_canberra', methods=['POST'])
def send_form_data_canberra():
    data = request.form
    text = 'SITE: canberra\n\n' + '\n'.join([f'{k} - {v}' for k, v in data.items()])
    requests.get(f'https://api.telegram.org/bot{token}/sendMessage?chat_id={chat_id}&text={text}')
    return redirect('/', code=302)
