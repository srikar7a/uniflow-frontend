import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <main>
            <div>
                <h1 id="header">Maize Pages</h1> 
            </div>
            <div>
                <ul>
                    <li class="nav-item"><Link to="/">Home</Link></li>
                    <li class="nav-item"><Link to="/orgs">Organizations</Link></li>
                    <li class="nav-item"><Link to="/registration">Registration</Link></li>
                    <li class="nav-item"><Link to="/quiz">Quiz</Link></li>
                </ul>
            </div>
        </main>
    );
  }
  
  export default Header;
  