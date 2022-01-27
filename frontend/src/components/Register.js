import React, { Component } from 'react'

import axios from 'axios'
import { Link, Redirect, useHistory } from 'react-router-dom';

const regForName = RegExp(/^[A-Za-z]/);
const regForEve = RegExp(/^(?!^ +$)^.+$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForMobile = RegExp(/^[0-9]{10}$/);


export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodata: [], fname: '', mobile: '', email: '', password: '', confirm_password: '', errors: {
                fname: '',
                mobile: '',
                email: '',
                password: '',
                confirm_password: ''



            }, err: {
                fname: '',
                mobile: '',
                email: '',
                password: '',
                confirm_password: ''



            }
        }
    }

    handle = (event) => {
        const { name, value } = event.target

        let errors = this.state.errors;
        let err = this.state.err;
        switch (name) {
            case 'fname':
                errors.fname = regForName.test(value) ? '' : 'Enter Valid first Name';
                if (errors.fname !== "") { err.fname = "error" }
                else { err.fname = ""}
                break;

            case 'mobile':
                errors.mobile = regForMobile.test(value) ? '' : 'Enter Username';
                if (errors.mobile !== "") { err.mobile = "error" }
                else { err.mobile = "" }
                break;
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Enter Valid Email';
                if (errors.email !== "") { err.email = "error" }
                else { err.email = "" }
                break;
            case 'password':
                errors.password = regForEve.test(value) ? '' : 'Enter Password';
                if (errors.password !== "") { err.password = "error" }
                else { err.password = "" }
                break;
            case 'confirm_password':
                errors.confirm_password = this.state.password === value ? '' : "Password and Confirm Password does not match"
                if (errors.confirm_password !== "") { err.confirm_password = "error" }
                else { err.fname = "" }
                break;

        }
        this.setState({ err, errors, [name]: value }, () => {
            console.log(errors)
        })
    }
    formSubmit = (event) => {
        event.preventDefault();

        if (this.validate(this.state.errors)) {
            if (this.state.email !== "" && this.state.password !== "" && this.state.fname !== "" && this.state.lname !== "" && this.state.username !== "") {
                alert("Details added successfully !!")
                this.add()
            }
            else {
                alert("Failed to Register")
            }


        }
        else {
            alert("Please Enter Valid Details");
        }
    }
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    add = (event) => {

        const URL = "http://localhost:8000/api/adduser"
        axios.post(URL, {
            name: this.state.fname,
            mobile: this.state.mobile,
            email: this.state.email,
            password: this.state.password
        })
            .catch(err => { console.log(err) })

    }

    render() {
        const { errors } = this.state;
        return (
            <div style={{backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-pizza-food-graphic-literary-green-leaf-wood-grain-brown-background-image_160656.jpg')", height:"auto"}}>
            <br/>
                <div className="container cardL" >
                <h1 className=" text-center ">Sign Up</h1>

                 
                        <br/>
                        <form onSubmit={this.formSubmit} method="post">
                            <h5>Name</h5>
                            <input type="text" name="fname" className="form-control" onChange={this.handle} />
                            {errors.fname.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.fname}</span>}<br />

                            <h5>Mobile</h5>
                            <input type="text" name="mobile" className="form-control" onChange={this.handle} />
                            {errors.mobile.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.mobile}</span>}<br />
                            <h5>Email</h5>
                            <input type="text" name="email" className="form-control" onChange={this.handle} />
                            {errors.email.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                            <h5>Password</h5>
                            <input type="password" name="password" className="form-control" onChange={this.handle} />
                            {errors.password.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.password}</span>}<br />
                            <h5>Confirm Password</h5>
                            <input type="password" name="confirm_password" className="form-control" onChange={this.handle} />
                            {errors.confirm_password.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.confirm_password}</span>}<br />
                            <div className="text-center">
                            <input type="submit" value="SUMBIT" className="btn btn-dark "  />
                            </div>
                            <br /><br />
                            <p className="text-center"> Go to <Link to="/">Login Page</Link></p>

                        </form>
                   

                </div>
            </div>
        )
    }
}

export default Register
