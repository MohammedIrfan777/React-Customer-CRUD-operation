import React, { Component } from 'react';
import AppService from '../service/AppService';
import 'bootstrap/dist/css/bootstrap.css';



class AddCustomer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName: '',
            dob: '',
            country: '',
            phoneNum: '',
            cars : "",
            gender: "",
            message: null,
            firstNameError:"",
            lastNameError:"",
            dobError:"",
            countryError:"",
            phoneNumError:""
        }
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
            let customer = {firstName:this.state.firstName, 
                lastName:this.state.lastName, 
                dob: this.state.dob, 
                country: this.state.country,
                phoneNum:this.state.phoneNum,
                cars:this.state.cars,
                gender:this.state.gender
            }
            AppService.saveCustomerData(customer)
            .then(res => {
                console.log(customer);
                this.setState({mesage : 'User Added Successfully!!' });
                this.props.history.push("/customers");
            })
        }
        
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div>
                <h2>Add Customer Details</h2>
                <form>
                    <table>
                        <tr>
                            <td>
                            <label>First Name</label>
                            </td>
                            <td>
                            <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                            <div style={{color:"red", fontSize:"10px"}}>{this.state.firstNameError}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>Last Name</label>
                            </td>
                            <td>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange}/> 
                        <div style={{color:"red", fontSize:"10px"}}>{this.state.lastNameError}</div>
                        </td>
                        </tr>
                    <tr>
                        <td>
                        <label>Date of birth</label></td>
                        <td>
                        <input type="date" data-date-format="YYYY-mm-dd" name="dob" value={this.state.dob} onChange={this.onChange}/>
                        <div style={{color:"red", fontSize:"10px"}}>{this.state.dobError}</div></td>
                        </tr>
                        <tr>
                            <td>
                        <label>Country</label></td>
                        <td>
                        <input type="text" name="country" value={this.state.country} onChange={this.onChange}/>
                        <div style={{color:"red", fontSize:"10px"}}>{this.state.countryError}</div></td>
                        </tr>
                        <tr>
                            <td>
                        <label>Phone Number</label></td>
                        <td>
                        <input type="number" name="phoneNum" max="10" value={this.state.phoneNum} onChange={this.onChange}/>
                        <div style={{color:"red", fontSize:"10px"}}>{this.state.phoneNumError}</div></td>
                        </tr>
                        <tr>
                            <td><label>Cars</label></td>
                            <td>
                            <select value={this.state.cars} onChange={this.onChange} name="cars">
                                <option value="Volvo">Volvo</option>
                                <option value="Saab">Saab</option>
                                <option value="VW">VW</option>
                                <option value="Audi" >Audi</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Gender</label></td>
                            <td><label>Male</label></td>
                            <td>
                                <input type="radio" name="gender" value="male" onChange={this.onChange}/>
                            </td>
                            <td><label>Female</label></td>
                            <td>
                                <input type="radio" name="gender" value="female" onChange={this.onChange}/>
                            </td>
                        </tr>
                        <tr><td>
                        <button className="btn btn-success" onClick={this.saveCustomer}>Save</button></td></tr>
                    </table>
                </form>
            </div>
        )
    }

}

export default AddCustomer;