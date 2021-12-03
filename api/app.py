from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
from flask import jsonify
from flask import request


app = Flask(__name__)
# api = Api(app)


@app.route('/timetables/')
def get_timetables():
    return jsonify({'timetable1':'test1', 'timetable2':'test2'})


@app.route('/testing/')
def get_number_of_classrooms():
    print(request.args)
    return f"{request.args.get('id')}", 200


# if __name__ == '__main__':
#     app.run()  # run our Flask app

