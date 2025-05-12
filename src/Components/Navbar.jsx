import React from 'react';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <p>WorkQueue - Task Manager</p>
            <ul>
                <li className='bi bi-info-circle-fill about'>
                    <div className="aboutText">This was a small project by VictorF313/Sharique in React Js</div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;