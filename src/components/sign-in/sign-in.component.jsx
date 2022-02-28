import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import './sign-in.style.scss';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends Component
{
    constructor()
    {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        }
        catch(err)
        {
            console.log("Error while sign in", err);
        }
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }
    render() {
        return (
            <div className="sign-in">
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label='Email'
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        required 
                    />

                    <FormInput
                        label='Password' 
                        name="password" 
                        type="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}
                        required 
                    />

                    <div className="buttons">
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;