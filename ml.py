from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('main.html')

@app.route("/data", methods=['GET', 'POST'])
def data():
    files = request.files.getlist('uploadFile[]')
    print(len(files))
    if len(files) > 0:
        resp = jsonify({'message' : 'Success!!!'})
        resp.status_code = 201
    else:
        resp = jsonify({'message' : 'Fail...'})
        resp.status_code = 400

    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
