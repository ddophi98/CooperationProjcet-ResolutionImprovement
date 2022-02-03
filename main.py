from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os, time
import ml

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './static/uploaded_files'
progress = []

@app.route("/")
def home():
    return render_template('main.html')

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    global progress
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
        progress = [0 for _ in range(len(file_list))]
        return render_template('process.html', file_list=file_list)

@app.route("/process_state")
def processState():
    global progress
    if request.method == 'GET':
        file_idx = int(request.args['idx'])
        return str(file_idx) + " " + str(progress[file_idx]), 200

@app.route("/deep_learning")
def deeplearning():
    global progress
    if request.method == 'GET':
        #[머신러닝 코드]
        ml.imageProcess()
        #[progress 업데이트 코드]
        cur = 0
        while progress[len(progress)-1] != 100 :
            for i, p in enumerate(progress):
                if p != 100:
                    cur = i
                    break
            progress[cur] += 10
            time.sleep(0.5)
        return 'success', 200

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
