import React, { Component } from 'react';
import apiService from "../service/AppService";

class EditCustomer  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: "",
            firstName:'',
            lastName: '',
            dob: '',
            country: '',
            phoneNum: '',
            firstNameError:"",
            lastNameError:"",
            dobError:"",
            countryError:"",
            phoneNumError:""
        }
        this.loadCustomer = this.loadCustomer.bind(this);
    }

    componentDidMount(){
        this.loadCustomer();
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    loadCustomer(){
        console.log("called edit");
        apiService.fetchCustomerById(window.localStorage.getItem("customerId"))
        .then((resp) => {
            let customer = resp.data;
            console.log(customer);
            this.setState({
                customerId: customer.customerId,
                firstName:customer.firstName,
                lastName: customer.lastName,
                dob: customer.dob,
                country: customer.country,
                phoneNum: customer.phoneNum,
            })

        });
    }

    validateForm = (e) => {
        let firstNameError = "";
        let lastNameError = "";
        let dobError = "";
        let countryError="";
        let phoneNumError="";
        let isNameValid = false;
        let isPhValid = false;

        if(this.state.firstName == "") {
            alert("First Name should not be blank");
            isNameValid = true;
        }

        if(this.state.phoneNum == "" || this.state.phoneNum.length<10 || this.state.phoneNum.length>10 ) {
            alert("Phone number cannot be blank & should be 10 digit");
            isPhValid = true;
        }
        if(isNameValid || isPhValid) {
            this.setState({firstNameError, phoneNumError});
            return false;
        }
        return true;
    }

    saveCustomer = (e) => {
        debugger;
        e.preventDefault();
        console.log("save clicked");
        
        if(this.validateForm()) {
            let customer = {
                customerId:this.state.customerId,
                firstName:this.state.firstName, 
                lastName:this.state.lastName, 
                dob: this.state.dob, 
                country: this.state.country,
                phoneNum:this.state.phoneNum
            }
            apiService.editUser(customer)
            .then(res => {
                console.log(customer);
                this.setState({mesage : 'User Added Successfully!!' });
                this.props.history.push("/customers");
            })
        }
        
    }

    render() {
        return(
            <div>
            <h2 className="text-center">Add Customer Details</h2>
            <form>
                <table>
                    <tr>
                        <td>
                        <label>First Name</label>
                        </td>
                        <td>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <label>Last Name</label>
                        </td>
                        <td>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange}/> 
                    
                    </td>
                    </tr>
                <tr>
                    <td>
                    <label>Date of birth</label></td>
                    <td>
                    <input type="date" data-date-format="YYYY-mm-dd" name="dob" value={this.state.dob} onChange={this.onChange}/>
                    </td>
                    </tr>
                    <tr>
                        <td>
                    <label>Country</label></td>
                    <td>
                    <input type="text" name="country" value={this.state.country} onChange={this.onChange}/>
                    </td>
                    </tr>
                    <tr>
                        <td>
                    <label>Phone Number</label></td>
                    <td>
                    <input type="number" name="phoneNum" max="10" value={this.state.phoneNum} onChange={this.onChange}/>
                    </td>
                    </tr>
                    <tr><td>
                    <button className="btn btn-success" onClick={this.saveCustomer}>Update</button></td></tr>
                </table>
            </form>
            </div>
        )
    }
}

export default EditCustomer;