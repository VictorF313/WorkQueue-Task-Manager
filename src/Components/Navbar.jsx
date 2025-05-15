import React from 'react';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <p>WorkQueue - Task Manager</p>
            <ul>
                <li className='bi bi-info-circle-fill about'>
                    <div className="aboutText">This project was a collaborative effort by VictorF313/Sharique, developed using React.js.</div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;