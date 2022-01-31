from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os

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
            # 한글 파일명은 secure_filename 지원이 안됨
            # filename = secure_filename(f.filename)
            filename = f.filename
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        progress = [0 for _ in range(len(files))]
        return 'success', 200
    elif request.method == 'GET':
        file_list = os.listdir(app.config['UPLOAD_FOLDER'])
        return render_template('process.html', file_list=file_list)

@app.route("/process_state")
def processState():
    global progress
    if request.method == 'GET':
        file_idx = request.args['idx']
        return str(progress[file_idx]), 200

@app.route("/deep_learning")
def deeplearning():
    global progress
    if request.method == 'GET':
        #[머신러닝 코드]
        #[progress 업데이트 코드]
        return 'success', 200

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
