import React, { Component } from 'react'

import AppNav from "../Navigation/AppNav"

import { axiosS }  from '../axiosSetup';
import bcrypt from 'bcryptjs'
import {Form, Button} from 'react-bootstrap';

class Register extends Component {

    emptyUser = {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        bills: []
    }

    constructor(props) {

        super(props);

        this.state = {

            isLoading: true,
            registerComplete: false,
            userExistCheck: false,
            newUser: this.emptyUser

    
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

    }


    handleChange(event) {
        let target = event.target;
        let value =  target.value;
        let targetName  = target.name;

        let newUser = {...this.state.newUser};
        newUser[targetName] = value;
        this.setState({newUser})

        console.log(this.state);
    }

    async handleRegister(event) {

        event.preventDefault();

        this.setState({registerComplete : false});

        let user = {...this.state.newUser};

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user["password"] = hash;

        await axiosS.post("api/user", user).then(
            response => {
                this.setState({registerComplete : true})
            }
        ).catch(err => {

            if (err.response) {
                this.setState({userExistCheck : true});
            }
        });
    }

    userExistCheckFunc() {
        if (this.state.userExistCheck) {
            return (
                <div>
                    <h3>Registration Problem! User Exists or Blank Form</h3>
                </div>
            );
        }
    }

    render() { 
        
        if (this.state.registerComplete) {
                
                return (
                    <div className="registerCompleted">
                        <div className="navBar">
                            < AppNav />
                        </div>

                        <div className="registerForm">
                            <h3>Register Completed!!</h3>
                            <p>
                                Go to log in page now!
                            </p>
                        </div>

                    </div>
                );
        }




        return ( 

            <div className="register">

                <div className="navBar">
                    < AppNav />
                </div>

                <div className="registerForm">

                    {this.userExistCheckFunc()}

                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" type="username" placeholder="Enter username" onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control name="name" type="name" placeholder="Full Name" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name="phone" type="number" placeholder="Phone" onChange={this.handleChange}/>
                        </Form.Group>

                        <Button variant="dark" type="submit" onClick={this.handleRegister}>
                            Register
                        </Button>
                    </Form>
                </div>


            </div>

         );
    }
}
 
export default Register;