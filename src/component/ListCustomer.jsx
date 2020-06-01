import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import apiService from "../service/AppService";


class ListCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            message: null
        }
        this.reloadUserList = this.reloadUserList.bind(this);
        this.addCustomer =  this.addCustomer.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }
    

    reloadUserList() {
        apiService.fetchCustomer()
        .then((resp) => {
            console.log(resp.data);
            this.setState({customers : resp.data });
        });
    }

    addCustomer() {
        console.log("clicked");
        this.props.history.push("/add-customer");
    }

    editCustomer(id) {
        window.localStorage.setItem("customerId", id);
        this.props.history.push("/edit-customer");
    }

    deleteCustomer(id) {
        
        console.log("delete called");
        if(window.confirm("Are you sure want to delete..?")) {
            apiService.deleteCustomer(id)
            .then((resp) => {
                this.setState({
                    message :"Customer deleted succesfully!!",
                    customers: this.state.customers.filter(customer => customer.customerId != id)
                })
            });
        } 
    }
    

    render() {
        return (
            <div>
                <h2 className="text-center">Customer details</h2>
                <button className="btn" onClick={() => this.addCustomer()}> Add Customer</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>First Name</th>
                            <th>Lats Name</th>
                            <th>DOB</th>
                            <th>Country</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map(cust =>
                                <tr key={cust.customerId}>
                                    <td>{cust.customerId}</td>
                                    <td>{cust.firstName}</td>
                                    <td>{cust.lastName}</td>
                                    <td>{cust.dob}</td>
                                    <td>{cust.country}</td>
                                    <td>{cust.phoneNum}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.editCustomer(cust.customerId)}>Edit</button>
                                        <button className="btn btn-success" onClick={() => this.deleteCustomer(cust.customerId)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        );
    }

}

export default ListCustomer;