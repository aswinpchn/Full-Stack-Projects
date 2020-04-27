# Using flask to make an api 
# import necessary libraries and functions 
from flask import Flask, jsonify, request 
from flask_cors import CORS
  
# creating a Flask app 
app = Flask(__name__) 
CORS(app) # Let the api acces for frontends.
  
# enter valid values for the data, you will get results.
@app.route('/stats/', methods = ['POST'])
def getStatistics():
    print(request.json) # If you send json body, you have to access like this only # https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request
    body = request.get_json()
    
    initialPrice = body.get("initialPrice")
    sellingPrice = body.get("sellingPrice")
    buyCommission = body.get("buyCommission")
    sellCommission = body.get("sellCommission")
    taxRate = body.get("taxRate")
    count = body.get("count")

    if(count <= 0):
        return jsonify({
            'status' : 'failure', 
            'reason' : 'count cannot be less than or equal zero, Hypothetical!'
        })

    if(initialPrice <= 0 or sellingPrice <= 0 or buyCommission < 0 or sellCommission < 0 or taxRate < 0): 
        return jsonify({
            'status' : 'failure', 
            'reason' : 'One of the data point have a invalid value'
        })

    proceeds = sellingPrice*count
    initialCost = count*initialPrice + buyCommission + sellCommission
    absoluteProfit = proceeds - initialCost
    tax = absoluteProfit*(taxRate/100)
    netProfit = absoluteProfit - tax
    cost = initialCost + tax        # this if for answer's sake
    roi = (netProfit/cost)*100
    breakEven = initialCost/count

    if(absoluteProfit <= 0):
        return jsonify({
            'status' : 'failure', 
            'reason' : 'You won"t get any money from this sale'
        })

    return jsonify({
        'proceeds': round(proceeds, 2), 
        'cost': round(cost, 2), 
        'netProfit': round(netProfit, 2), 
        'roi': round(roi, 2),
        'breakEven': round(breakEven, 2), 
        'status': 'success'
    })


# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/', methods = ['GET']) 
def home(): 
    if(request.method == 'GET'): 
  
        data = "hello world"
        return jsonify({'data': data}) 
  
# driver function 
if __name__ == '__main__': 
    app.run(host='0.0.0.0')

# app.run(debug= True) # This has to be used while debugging. The other while deployment.