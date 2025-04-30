import React from 'react';
import './Login.css';
import logo from './lumi-logo.jpg';

function HomePage() {
    return ( 
        <div className="container">
            <div className="image-section">
                <img src={logo} alt='Logo'/>
            </div>
            <div className="login-section">
                <h2>Welcome to Lumi!</h2>
                <form>
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="johnsmith@company.com" required/>
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="********" required/>
                    <p className="password-note">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
                    <div className="options">
                        <div className="checkbox-wrap">
                            <input type="checkbox" id="remember" />
                            <label for="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <p className="signup">No account yet? <a href="#">Sign Up</a></p>
            </div>
        </div>
    );
}

export default HomePage;