import RPi.GPIO as GPIO
import time
import requests
from random import randint
from datetime import datetime

GPIO.setmode(GPIO.BCM)

GPIO.setup(24, GPIO.IN)
GPIO.setup(23,GPIO.IN)

while True:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(24, GPIO.IN)
    GPIO.setup(23,GPIO.IN)

    
    input_state1 = GPIO.input(23)
    input_state2 = GPIO.input(24)
    print (int(input_state1),int(input_state2))
    if input_state1 == True and input_state2 == True :
        state1 = 'present'
        print (int(input_state1))
    if input_state1 == False and input_state2 == False:
        state1 = 'not present'
        print (int(input_state1))
    
#    if input_state2 == True:
#        state2 = 'present'
#        print (int(input_state2))
#    if input_state2 == False:
#        state2 = 'not present'
#        print (int(input_state2))
    print (state1)
    userdata = {"status1": state1}
    #userdata = {"status1": randint(0,9),"status2": randint(0,9)}
    resp = requests.post('http://aswinp.in/test1.php', params=userdata)
    print (resp.status_code)
    time.sleep(5)

