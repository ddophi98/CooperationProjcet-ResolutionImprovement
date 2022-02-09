from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os, time
import ml

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './static/uploaded_files'
app.config['PROCESS_FOLDER'] = './static/processed_files'

@app.route("/")
def home():
    return render_template('main.html')

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        for f in os.scandir(app.config['UPLOAD_FOLDER']):
            os.remove(f.path)
        files = request.files.getlist('uploadFile[]')
        for f in files:
            filename = f.filename
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'success', 200
    elif request.method == 'GET':
        file_list = os.listdir(app.config['UPLOAD_FOLDER'])
        return render_template('process.html', file_list=file_list)

@app.route("/process_state")
def processState():
    if request.method == 'GET':
        totalState = ''
        for s in ml.state:
            totalState += (s + ' ')
        return totalState, 200

@app.route("/deep_learning")
def deeplearning():
    if request.method == 'GET':
        ml.imageProcess()
        file_list = os.listdir(app.config['PROCESS_FOLDER'])
        fileListStr = ''
        for f in file_list:
            fileListStr += (f + '/')
        return fileListStr, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
