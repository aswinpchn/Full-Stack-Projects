import React, {Component} from 'react';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';


//Create a Main Component
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display : ""
        };

        this.inputProcess = this.inputProcess.bind();
        this.resultCalculation = this.resultCalculation.bind();
        this.processDisplay = this.processDisplay.bind();
    }

    processDisplay = (unProcessedDisplay) => {
        try {
            let split1 = unProcessedDisplay.split('+');
            let split2 = unProcessedDisplay.split('-');
            let split3 = unProcessedDisplay.split('*');
            let split4 = unProcessedDisplay.split('/');

            if(split1.length + split2.length + split3.length + split4.length != 5) {
                return false;
            } else {
                if(split1.length == 2) {
                    return {
                        Operand1 : split1[0],
                        Operand2 : split1[1],
                        Operator : '+'
                    };
                }
                if(split2.length == 2) {
                    return {
                        Operand1 : split2[0],
                        Operand2 : split2[1],
                        Operator : '-'
                    };
                }
                if(split3.length == 2) {
                    return {
                        Operand1 : split3[0],
                        Operand2 : split3[1],
                        Operator : '*'
                    };
                }
                if(split4.length == 2) {
                    return {
                        Operand1 : split4[0],
                        Operand2 : split4[1],
                        Operator : '/'
                    };
                }
            }
        } catch {
            return false;
        }
    
    }

    inputProcess = (e) => {
        //document.getElementById('display').value += e.target.value;  // Basic JS way of doing it, be a grown-up and use states.

        this.setState({ display : this.state.display + e.target.value });
    }

    resultCalculation = (e) => {

        let processedDisplay = this.processDisplay(this.state.display);

        if(processedDisplay == false) {
            this.setState({ display : "" });
            window.alert('Wrong process tried.');
        } else {

            var headers = new Headers();
            //prevent page from refresh
            e.preventDefault();

            axios.defaults.withCredentials = true;

            axios.post('http://localhost:3001/', processedDisplay)
            .then(response => {
                this.setState({ display : response.data.result });   
            }).catch((response) => {
                window.alert('Some problem with calling the API.' + response.status);
            });    
        }
    }

    render(){
        return(
            <div className="App">
                <Container>
                    <Row id="display">
                        <FormControl
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled="true"
                            id="display"
                            value={this.state.display}
                        /> 
                    </Row>  
                    <Row id="input_area">
                        <Col xs={4}>
                        </Col>
                        <Col xs={4} id="input_buttons">
                            <Row i>
                            <Col xs={3}>
                                <Button variant="info" value="1" onClick={this.inputProcess}>1</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="2" onClick={this.inputProcess}>2</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="3" onClick={this.inputProcess}>3</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="=" onClick={this.resultCalculation} >=</Button>
                            </Col>
                            </Row>
                            <Row>
                            <Col xs={3}>
                                <Button variant="info" value="4" onClick={this.inputProcess}>4</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="5" onClick={this.inputProcess}>5</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="6" onClick={this.inputProcess}>6</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="." onClick={this.inputProcess}>.</Button>
                            </Col>
                            </Row>
                            <Row>
                            <Col xs={3}>
                                <Button variant="info" value="7" onClick={this.inputProcess}>7</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="8" onClick={this.inputProcess}>8</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="9" onClick={this.inputProcess}>9</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="0" onClick={this.inputProcess}>0</Button>
                            </Col>
                            </Row>
                            <Row>
                            <Col xs={3}>
                                <Button variant="info" value="+" onClick={this.inputProcess}>+</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="-" onClick={this.inputProcess}>-</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="*" onClick={this.inputProcess}>*</Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="info" value="/" onClick={this.inputProcess}>/</Button>
                            </Col>
                        </Row>  
                    </Col>
                        <Col xs={4}>
                        </Col>
                    </Row>  
                </Container>  
            </div>
        )
    }
}
//Export The Main Component
export default Main;