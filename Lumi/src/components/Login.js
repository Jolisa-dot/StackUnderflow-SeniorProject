import React from 'react';
import './Login.css';

function HomePage() {
    return ( 
        <div class="container">
            <div class="image-section">
        </div>
        <div class="login-section">
            <h2>Log In</h2>
            <form>
                <label for="email">Email Address</label>
                <input type="email" id="email" placeholder="Placeholder" required/>

                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Placeholder" required/>
                <p class="password-note">It must be a combination of minimum 8 letters, numbers, and symbols.</p>

                <div class="options">
                    <input type="checkbox" id="remember"/> 
                    <label for="remember">Remember me</label>
                    <a href="#" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit">Log In</button>
            </form>

            <p class="signup">No account yet? <a href="#">Sign Up</a></p>
        </div>
        </div>
        
    );
}

export default HomePage;