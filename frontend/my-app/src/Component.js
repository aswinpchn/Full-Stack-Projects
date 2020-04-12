import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stockName: "", 
			allotment: "", 
			initialPrice: "", 
			sellingPrice: "", 
			buyCommission: "", 
			sellCommission: "", 
			taxRate: "", 
			status: null
		};
	}

	inputChangedHandler = (event) => {
		let id = event.target.id;
		
		if(id === "stockName")
			this.setState({
				stockName: event.target.value
			});

		if(id === "allotment")
		this.setState({
			allotment: event.target.value
		});

		if(id === "initialPrice")
		this.setState({
			initialPrice: event.target.value
		});

		if(id === "sellingPrice")
		this.setState({
			sellingPrice: event.target.value
		});

		if(id === "buyCommission")
		this.setState({
			buyCommission: event.target.value
		});

		if(id === "sellCommission")
		this.setState({
			sellCommission: event.target.value
		});

		if(id === "taxRate")
		this.setState({
			taxRate: event.target.value
		});
	}

	submitHandler = async () => {

		try {
			let result = await axios.post('http://3.101.23.185:5000/stats/', {
				name: this.state.stockName,
				initialPrice: Number(this.state.initialPrice), 
				sellingPrice: Number(this.state.sellingPrice), 
				buyCommission: Number(this.state.buyCommission),
				sellCommission: Number(this.state.sellCommission), 
				taxRate: Number(this.state.taxRate), 
				count: Number(this.state.allotment)
			});

			if(result.data.status === 'failure') {
				this.setState({
					status: "failure", 
					errorMessage: result.data.reason
				});
			} else {
				let proceeds = result.data.proceeds;
				let cost = result.data.cost;
				let netProfit = result.data.netProfit;
				let roi = result.data.roi;
				let breakEven = result.data.breakEven;
				this.setState({
					status: "success", 
					sucessMessageProceeds: proceeds, 
					sucessMessagecost: cost, 
					successMessageNetProfit: netProfit, 
					successMessageROI: roi, 
					successMessageBreakEven: breakEven
				});
			}
		} catch(error) {
			
			// This was one wierd issue, when there is Connection refused error and all, the request hasnt even reched the server(https://github.com/axios/axios#handling-errors).
			//console.log(error.request); // if error.response existed then request has gone but some error(400/500) has happened.
			// If error.response itself is not there, then err connection refused has happened.
			if(!error.response) {
				this.setState({
					status: "failure", 
					errorMessage: "Connection refused."
				});
			}
		}

	}

	


	render() {
		let result;
		if(this.state.status === "failure") {
			result = <div class="alert alert-danger" role="alert">
										{this.state.errorMessage}
								</div>;
		} else if(this.state.status === "success") {
			result = <div class="alert alert-success" role="alert">
									<h3>Proceeds: {this.state.sucessMessageProceeds}</h3>
									<h3>Cost: {this.state.sucessMessagecost}</h3>
									<h3>Net Profit: {this.state.successMessageNetProfit}</h3>
									<h3>ROI: {this.state.successMessageROI}</h3>
									<h3>Break Even: {this.state.successMessageBreakEven}</h3>
								</div>;
		} else {
			// This means status is null.
		}

		return (
			<div className="container">
				<h1 className="display-4">Welcome to Stock Profit Calculator</h1>
				<form>
					<div className="form-group">
						<label for="stockName">Stock Name</label>
						<input type="text" className="form-control" value={this.state.stockName} onChange={this.inputChangedHandler} id="stockName" />
					</div>
					<div className="form-group">
						<label for="allotment">Allotment</label>
						<input type="number" className="form-control" value={this.state.allotment} onChange={this.inputChangedHandler} id="allotment" />
					</div>
					<div className="form-group">
						<label for="initialPrice">Initial Price</label>
						<input type="number" className="form-control" value={this.state.initialPrice} onChange={this.inputChangedHandler} id="initialPrice" />
					</div>
					<div className="form-group">
						<label for="sellingPrice">Selling Price</label>
						<input type="number" className="form-control" value={this.state.sellingPrice} onChange={this.inputChangedHandler} id="sellingPrice" />
					</div>
					<div className="form-group">
						<label for="buyCommission">Buy Commision</label>
						<input type="number" className="form-control" value={this.state.buyCommission} onChange={this.inputChangedHandler} id="buyCommission" />
					</div>
					<div className="form-group">
						<label for="sellCommission">Sell Commision</label>
						<input type="number" className="form-control" value={this.state.sellCommission} onChange={this.inputChangedHandler} id="sellCommission" />
					</div>
					<div className="form-group">
						<label for="taxRate">Tax Rate</label>
						<input type="number" className="form-control" value={this.state.taxRate} onChange={this.inputChangedHandler} id="taxRate" />
					</div>
					<button type="button" onClick={this.submitHandler} disabled={!(this.state.allotment && this.state.buyCommission && this.state.initialPrice && this.state.sellCommission && this.state.sellingPrice && this.state.stockName && this.state.taxRate)} className="btn btn-primary">Calculate</button>
					<small class="form-text text-muted">Complete the form to enable this button.</small>
				</form>
				{result}
				<footer class="footer mt-auto py-3">
					<div class="container">
						<span class="text-muted">By Aswin Prasad. (014344512) for CMPE 285 HW. Using ReactJs, Flask(Python) </span>
						<a href="https://github.com/aswinpchn/Stock-Profit-Calculator">Github Link</a>
					</div>
				</footer>
			</div>
		);
	}
}

export default Home;