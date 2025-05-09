import React from 'react';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <p>WorkQueue - Task Manager</p>
            <ul>
                <li>Home</li>
                <li>About
                    <div className="aboutText">This was a pet project by VictorF313/Sharique in React Js</div>
                </li>
                <li>Services</li>
                <li>Contact Us</li>
            </ul>
        </nav>
    );
};

export default Navbar;