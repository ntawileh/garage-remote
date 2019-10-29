# set input to high for 0.2 seconds 
# this is triggering the relay attached to that input

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)
GPIO.output(17, GPIO.HIGH)
time.sleep(2000 / 1000)
GPIO.output(17, GPIO.LOW)
GPIO.cleanup()
