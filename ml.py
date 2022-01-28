from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    a = 3
    b = 5
    rst = a + b
    return render_template('main.html', result=rst)

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
