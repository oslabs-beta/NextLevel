import React from 'react';
import './login.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';

export default function Login() {
  return (
    <body>
      <div className="wrapper">
        <form action="">
          <h1> NEXT LEVEL </h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaCircleUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <Si1Password className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit"> Login </button>

          <div className="register-link">
            <p>
              {' '}
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
}
