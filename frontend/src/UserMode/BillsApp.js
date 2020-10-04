import React, { Component } from 'react'

import {Table, Form, Button} from 'react-bootstrap';

import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";



class BillsApp extends Component {

    userToLogin = {
        username: "",
        password: "",
        name: "",
        bills: []
    }

    userData = {
        username: this.props.data.loginUser.username
    }

    categoryData = {
        "id": 0
    }

    newBill = {
        cost: 0,
        name: "",
        categoryName: "Food Expenses",
        date: new Date(),
        user: this.userData,
        category: this.categoryData
        
    }

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            bill: this.newBill,
            allCategories: [],
            allUserBills: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;

        let inpBill = {...this.state.bill};

        inpBill[target.name] = target.value;

        this.setState({bill: inpBill});

        console.log(this.state.bill);
    }

    handleCost(event) {
        let bill = {...this.state.bill};
        bill["cost"] = Number(event.target.value);
        this.setState({bill: bill})
        console.log(this.state.bill);
    }


    handleDateChange(date) {
        let inpBill = {...this.state.bill};
        inpBill.date = date;
        this.setState({bill: inpBill});
        console.log(this.state.bill);
    }

    handleCategoryChange(event) {
        
        let changeCategory = { id: event.target.value}
        let bill = {...this.state.bill};
        bill.category = changeCategory;
        bill.categoryName = event.target.options[event.target.selectedIndex].text;
        this.setState({bill:bill});

        console.log(bill);
    }

    async handleDelete(id) {
        await axios.delete(`api/bill/${id}`).then(
            () => {
                let updatedBills = [...this.state.allUserBills].filter(bill => bill.id !== id);
                this.setState({allUserBills: updatedBills});
            }
        );
    }

    async handleSubmit(event) {
        
        event.preventDefault();
        const sendBill = {...this.state.bill};
        await axios.post('api/bill', sendBill).then(
           async res => {
            await axios.get(`api/user/${this.userData.username}`).then(
                res1 => this.setState({allUserBills: res1.data.bills, isLoading: false})
            );
           }
        );
    }

    async componentDidMount() {
        await axios.get('api/categories').then(
            res => {
                this.setState({allCategories: res.data})

                let first = this.state.allCategories[0];
                const categoryId = {
                    "id": first.id
                }

                let firstBill = {...this.state.bill};

                firstBill["categoryName"] = first.name;
                firstBill["category"] = categoryId;

                this.setState({bill: firstBill});

                console.log(this.state.bill);
            }
        );

        await axios.get(`api/user/${this.userData.username}`).then(
            res => this.setState({allUserBills: res.data.bills, isLoading: false})
        );
    }


    render() { 

        const {allCategories} = this.state;
        const {allUserBills, isLoading} = this.state

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        let rowCategory = allCategories.map(
            category => <option id={category.name} value={category.id}>{category.name}</option>
        );


        let rowBills = allUserBills.map(

            bill => 
                <tr>
                    <td>{bill.name}</td>
                    <td>${bill.cost}</td>
                    <td>{bill.date}</td>
                    <td>{bill.categoryName}</td>
                    <td>
                        <Button onClick={() => this.handleDelete(bill.id)} variant="danger" type="submit">
                        Delete
                        </Button>
                    </td>
                </tr>
        );

        return (  

            <div>

                <h3>Welcome to BillTrack App {this.props.data.loginUser.name}! </h3>
                <Button onClick={() => this.props.setClear()} variant="success" type="submit">
                        Log Out
                </Button>

                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Bill Name" onChange={this.handleChange} name="name" type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control placeholder="Enter Bill Cost" type="number" onChange={this.handleCost}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{margin: '10px'}}>Date: </Form.Label>{" "}
                        <DatePicker name="date" selected={this.state.bill.date} onChange={this.handleDateChange}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                        <Form.Control onChange={this.handleCategoryChange} as="select">
                            {rowCategory}
                        </Form.Control>
                    </Form.Group>
                    
                    <Button onClick={this.handleSubmit} variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>


                <div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowBills}
                        </tbody>
                    </Table>
                </div>

            </div>

        );
    }
}
 
export default BillsApp;