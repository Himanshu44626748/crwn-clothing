import React from 'react';
import './sign-up.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword)
        {
            alert("Password doesn't match with confirm password");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        }
        catch(err)
        {
            console.log("Error while registering new user", err);
        }
    }

    render(){
        return (
            <div className='sign-up'>

                <h1 className='title'>I do not have an account</h1>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        label="Display Name" 
                        type="text" 
                        name="displayName" 
                        value={this.state.displayName}
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        label="Email" 
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        label="Password" 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        label="Confirm Password" 
                        type="password" 
                        name="confirmPassword" 
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form> 
            </div>
        )
    }
}

export default SignUp;