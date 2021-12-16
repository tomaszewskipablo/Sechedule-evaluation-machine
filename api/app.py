from flask import Flask, jsonify, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
from lib.utils.utils import *

app = Flask(__name__)
# api = Api(app)


@app.route('/timetables/')
def get_timetables():
    return jsonify({'timetable1':'test1', 'timetable2':'test2'})


@app.route('/s3_files')
def files_on_s3():
    return jsonify(get_uploaded_file_names())


@app.route('/radarplotmetrics')
def radarplot_metrics():
    schedule_file = request.args.get('schedule_filename')

    return jsonify(get_radarplot_metrics(schedule_file))


@app.route('/barplotdata')
def barplot_data():
    schedule_file = request.args.get('schedule_filename')
    classroom_file = request.args.get('classroom_filename')

    return jsonify(get_barplot_data(schedule_file, classroom_file))

if __name__ == '__main__':
    app.run(debug=False)  # run our Flask app

