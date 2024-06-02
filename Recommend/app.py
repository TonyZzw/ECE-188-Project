from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import recommend_product

app = Flask(__name__)

# CORS(app, resources={r"/recommend": {"origins": "http://localhost:3001"}}) 
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/recommend', methods=['POST'])
def recommend():
    survey_data = request.get_json()
    recommendation = recommend_product(survey_data)
    return jsonify(recommendation)

if __name__ == '__main__':
    app.run(debug=True, port=5001)

