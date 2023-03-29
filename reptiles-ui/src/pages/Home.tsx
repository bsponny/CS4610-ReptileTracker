import React from 'react';
import whiteLizrd from '../assets/white-lizrd.png';
import snakeVideo from '../assets/snake.mp4';
import './Home.css';

interface HomeProps {
    setPage: (pageName: string) => void;
}

export const HomePage = ({setPage}: HomeProps) => {
    return (
        <main>
            <section id="intro">
                <video autoPlay muted loop>
                    <source src={snakeVideo} type="video/mp4" />
                </video>
                <div className="container overlay-text">
                    <div className="inner-textbox">
                        <img src={whiteLizrd} />
                        <p className="life">Our app makes your life easier!</p>
                        <a className="btn">Login</a>
                        <a className="btn btn-white" onClick={() => setPage("sign-up")}>Sign Up</a>
                    </div>
                </div>
            </section>
            <section id="features">
                <div className="container">
                    <header>
                        <h2>Features</h2>
                    </header>
                    <ul>
                        <li>Manage reptile schedules</li>
                        <li>Keep track of reptile feedings</li>
                        <li>Store husbandry records</li>
                        <li>View your daily schedule of reptiles</li>
                    </ul>
                </div>
            </section>
            <section id="contact">
                <div className="container">
                    <header>
                        <h2>Contact Us</h2>
                    </header>
                    <form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" />
                        </div>
                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message"></textarea>
                        </div>
                        <div>
                            <input type="submit" value="Send" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}