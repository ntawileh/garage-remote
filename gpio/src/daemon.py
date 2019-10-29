import redis
import os
import time
import sys
import traceback
import RPi.GPIO as GPIO
import time

def triggerRelay():
   GPIO.setmode(GPIO.BCM)
   GPIO.setup(17, GPIO.OUT)
   GPIO.output(17, GPIO.HIGH)
   time.sleep(2000 / 1000)
   GPIO.output(17, GPIO.LOW)
   GPIO.cleanup()

def RedisLoop():
    try:
        conn = redis.StrictRedis(
            host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT'])

        pubsub = conn.pubsub()
        pubsub.subscribe(['gpiod'])

        for item in pubsub.listen():
            print(item)
            if item['type'] == 'message' and item['data'] == b'relay':
               triggerRelay()            
    except:
        print("error", sys.exc_info()[0])


if __name__ == '__main__':
    RedisLoop()
