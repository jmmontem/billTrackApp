import React, { Component } from 'react'


import AppNav from "../Navigation/AppNav"

import axios from 'axios'
import {Form, Button, Table} from 'react-bootstrap';

class Category extends Component {


     constructor(props) {
         super(props);

         this.state = { 
            isLoading : true,
            addcategory: "",
            categories: []
         }

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }


     handleChange(event) {
         const target = event.target;
         const value = target.value;
         let addcategory={...this.state.addcategory};
         addcategory = value;
         this.setState({addcategory});
         console.log(addcategory);
     }

     async handleSubmit(event) {
        
        event.preventDefault();

        const newCategory = {
            name: this.state.addcategory
        };

        await axios.post("api/category", newCategory).then(

            async res => {
                console.log(res.statusText)
                await axios.get(`api/categories`).then(
                    res1 => {
                        console.log(res1.statusText);
                        this.setState({categories: res1.data, isLoading: false})
                    }
                );

            }

        );
     }

    async handleDelete(id) {
        let res = axios.delete(`api/category/${id}`);
    ;
        res.then(() => {
            let updateCategories = [...this.state.categories].filter(
                category => category.id !==id
            );

            this.setState({categories: updateCategories});
        });
    }

    async componentDidMount() {
        await axios.get('api/categories').then(
            res => {
                console.log(res.statusText)
                console.log(res.data); 
                this.setState({
                    categories: res.data,
                    isLoading: false
                });
            }
        );
    }

    render() { 

        // eslint-disable-next-line
        const {addcategory, categories, isLoading} = this.state;


        if (isLoading) {
            return (<div>Loading....</div>);
        }


        let rowCategory = categories.map(

            category => 
                <tr>
                    <td>{category.name}</td>
                    <td>
                        <Button onClick={() => this.handleDelete(category.id)} variant="danger" type="submit">
                        Delete
                        </Button>
                    </td>
                </tr>
        );


        return (  

            <div className="categoryApp">

                <div className="navBar">
                    < AppNav />
                </div>

                <h3>Add a Category!</h3>
                
                <div className="categoryForm">
                    <Form>
                    <Form.Group controlId="formBasicInput">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                        The New Category will be added to the database as a new option
                        </Form.Text>
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </Form>
                </div>
   
                <div className="categoryItems">

                    <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowCategory}
                            </tbody>
                    </Table>

                </div>
            
            </div>

        );
    }
}
 
export default Category;