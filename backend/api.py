from flask import Flask, request # flask requires installation
from flask_cors import CORS, cross_origin
from attendance import post_api, get_api, get_specific_api, get_avg_api, delete_api
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

def category_second_checker(categories):
    checker = ['room_name', 'room_start', 'room_finish', 'name', 'email', 'time', 'overall_time', 'platform']
    for req in categories:
        if req not in checker: return False
    return True

def category_checker(categories):
    if categories == None: categories="*"
    else:
        flag = category_second_checker(categories.split(","))
        if not flag: return False
    return categories
    
#HTTP actions

@app.route('/', methods=['POST'])
def insert_csv():
    load_dotenv()
    source_ssh = os.getenv("SSH_ADDRESS")
    os.system(f'scp -i ./.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null {source_ssh} ./csv_files/')
    folder = 'csv_files/'
    results = post_api(folder)
    if results == 'Done!': return {
        "results": results,
        "status_code": 200
    } 
    return {
        "results": results,
        "status_code": 404
    }

@app.route('/', methods=['GET'])
@cross_origin()
def get_mysql_category():
    categories = category_checker(request.args.get('categories'))
    if not categories: return {
        "results": "Categories don't match",
        "status_code": 404
    }
    
    results = get_api(categories)
    if results == 'problem with request' or results == "Bad connection to database": return {
        "results": results,
        "status_code": 404
    }
    elif len(results) == 0: return {
        "results": "No results",
        "status_code": 204
    }
    return {
        "results": results,
        "status_code": 200,
        "results_count": len(results)
    }

@app.route('/', methods=['DELETE'])
def delete_everythin():
    results = delete_api()
    if results == 'problem with request' or results == "Bad connection to database": return {
        "results": results,
        "status_code": 404
    }
    else: return {
        "results": results,
        "status_code": 204
    }

@app.route('/specific', methods=['GET'])
def get_mysql_specefic():
    input_type = request.args.get('type')
    if input_type != 'name' and input_type != 'email': return {
        "results": "Bad input types",
        "status_code": 404
    }
    input_text = request.args.get('input')
    categories = category_checker(request.args.get('categories'))
    if not categories: return {
        "results": "Categories don't match",
        "status_code": 404
    }
    dynamic = request.args.get('dynamic')
    if dynamic == None: dynamic = False
    else: dynamic = True
    
    results = get_specific_api(categories, input_type, input_text, dynamic)
    if results == 'problem with request' or results == "Bad connection to database": return {
        "results": results,
        "status_code": 404
    }
    elif len(results) == 0: return {
        "results": "No results",
        "status_code": 204
    }
    return {
        "results": results,
        "status_code": 200,
        "results_count": len(results)
    }
    
@app.route('/average', methods=['GET'])
def get_average():
    results = get_avg_api()
    if results == 'problem with request' or results == "Bad connection to database": return {
        "results": results,
        "status_code": 404
    }
    elif len(results) == 0: return {
        "error": "No results",
        "status_code": 204
    }
    return {
        "results": results,
        "status_code": 200,
        "results_count": len(results)
    }
    

if __name__ == '__main__':
    app.run(host='0.0.0.0') # the host ip is for docker reasons only