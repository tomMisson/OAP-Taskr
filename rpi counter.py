from sense_hat import SenseHat
from time import sleep
import os, pymongo

sense = SenseHat()
client = pymongo.MongoClient("mongodb+srv://admin:giF6Cl1FXHfzp5xo@cluster0-hztnf.gcp.mongodb.net/test")
db = client.tasker

while True:
    numOfTasks = db.tasks.count()
    sense.show_message("Current tasks: " + str(numOfTasks), scroll_speed=0.1)

