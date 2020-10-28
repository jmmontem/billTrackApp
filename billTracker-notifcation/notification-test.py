from datetime import datetime
from pytz import timezone
from twilio.rest import Client

import requests
import json
import os


acc_sid = 'X'
auth_token = 'X'
SID = 'ISX'


client = Client(acc_sid, auth_token)


tz = timezone('US/Eastern')

headers={'Content-type':'application/json', 'Accept':'application/json'}

while True:
    date_right_now = datetime.now(tz).date()
    
    response = requests.get("https://bill-track-api.herokuapp.com/api/bills")
    data = response.json()
    for bill in data:

        bill_id = bill['id']
        bill_cost = bill['cost']
        bill_name = bill['name']
        bill_date = bill['date']
        needToNotify = bill['notified']

        
        date = datetime.strptime(bill_date, '%Y-%m-%d').date()

        user_name = bill['user']['name']
        user_phone = "+1" + bill['user']['phone']
        category = bill["category"]["name"]
        
        if needToNotify and date_right_now == date:
            
            bill['notified'] = False
            jsonData = json.dumps(bill)
            r = requests.put(f"https://bill-track-api.herokuapp.com/api/bill/{bill_id}", \
                             data=jsonData, headers=headers)

            binding = {"binding_type":"sms", "address":user_phone}
            message = f"Notification About Bills!\n" + \
                    f"Hi {user_name}!\n" + \
                    f"{bill_name} in Category of {category} is due Today!\n" + \
                    f"The Cost is ${bill_cost}\n" + \
                    f"Hurry up!"
            
            notification = client.notify.services(SID) \
                           .notifications.create(
                            to_binding = json.dumps(binding),
                            body= message)
            print(notification.sid)



