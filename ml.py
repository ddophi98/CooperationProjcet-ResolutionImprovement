from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './files'

@app.route("/")
def home():
    return render_template('main.html')

@app.route("/process", methods=['GET', 'POST'])
def process():
    if request.method == 'POST':
        print("111")
        for f in os.scandir("files"):
            os.remove(f.path)
        print("222")
        files = request.files.getlist('uploadFile[]')
        for f in files:
            # 한글 파일명은 secure_filename 지원이 안됨
            # filename = secure_filename(f.filename)
            filename = f.filename
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        complete_file = open("files\complete.txt", 'w')
        complete_file.close()
        print("333")
        return '', 200
    else:
        while not os.path.isfile("files\complete.txt"):
            print("no")
        print("yes")
        return render_template('main.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
