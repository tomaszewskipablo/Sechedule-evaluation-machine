from flask import Flask, jsonify, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
from lib.utils.utils import *
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
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

@app.route('/uploader', methods=['POST', 'PUT'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']

        bucket = 'timetableuploadedfiles'  # already created on S3
        s3 = boto3.client('s3')

        s3.upload_fileobj(f, bucket, f.filename)

        return 'file uploaded successfully'


@app.errorhandler(401)
def unauthorized(error):
    return json.dumps({"code": "invalid_token",
                       "message": "The access token was missing, invalid or expired"}), \
           401, {'Content-Type': 'application/json; charset=utf-8'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # run our Flask app

