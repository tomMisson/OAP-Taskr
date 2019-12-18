from sense_hat import SenseHat
from time import sleep
import os, pymongo

sense = SenseHat()
client = pymongo.MongoClient(os.getenv(CONNECTION))
db = client.OAP-Taskr

while True:
    numOfTasks = db.tasks.count()
    sense.show_message("Current tasks: " + numOfTasks)

