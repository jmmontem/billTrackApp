import React, { Component } from 'react';

import AppNav from "../Navigation/AppNav"
import BillsApp from "../UserMode/BillsApp"

import bcrypt from 'bcryptjs'
import {Form, Button} from 'react-bootstrap';
import { axiosS }  from '../axiosSetup';



class Home extends Component {

    userToLogin = {
        username: "",
        password: "",
        name: "",
        email: "",
        phone: ""
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            wrongPassword: false,
            loginUser: this.userToLogin
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.setClear = this.setClear.bind(this);
    }

    
    handleChange(event) {
        let target = event.target;
        let value =  target.value;
        let targetName  = target.name;

        let loggedUser = {...this.state.loginUser};
        loggedUser[targetName] = value;
        this.setState({loginUser: loggedUser})

        console.log(this.state.loginUser);
    }


    handleLogin(event) {
        
        event.preventDefault();

        const loggedusername = this.state.loginUser.username;
        const loggedpassword = this.state.loginUser.password;

        axiosS.get(`api/user/${loggedusername}`).then(
            response => {

                let sample = bcrypt.compare(loggedpassword, response.data.password)

                sample.then(res => {
                    if (res) {
                        this.setState({wrongPassword: false, isLoggedIn: true, loginUser: response.data});
                        console.log("Logging in!");
                    }
                    else{
                        console.log(this.state.wrongPassword);
                        this.setState({wrongPassword: true});
                        console.log(this.state.wrongPassword);
                    }
                });
            }
        );



    } 


    wrongPasswordMessage() {
        if (this.state.wrongPassword) {

            return (
                <div>
                    <h3>Wrong Password!!</h3>
                </div>
            );
        }
    }


    setClear() {
        this.setState({wrongPassword: false, isLoggedIn: false, loginUser: this.userToLogin});
    }



    render() { 

        if (this.state.isLoggedIn) {
            return (
                <div className="expense">

                    < AppNav />
                    < BillsApp setClear={this.setClear} data={this.state}/> 

                </div>


            );
        }


        return (  

            <div className="home">
                
                <div className="navBar">
                    < AppNav />
                </div>

                <h3>Welcome to BillTrack App!</h3>

                {this.wrongPasswordMessage()}

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.handleChange} name="username" type="username" placeholder="Enter Username" />
                        <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button onClick={this.handleLogin} variant="success" type="submit">
                        Log In
                    </Button>
                </Form>

            </div>

        );
    }
}
 
export default Home;