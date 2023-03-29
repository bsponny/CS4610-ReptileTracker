import React from 'react';
import whiteLizrd from '../assets/white-lizrd.png';
import snakeVideo from '../assets/snake.mp4';
import './Home.css';

export const HomePage = () => {
    return(
        <main>
        <header>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
    <section id="intro">
        <video autoPlay muted loop>
            <source src={snakeVideo} type="video/mp4" />
        </video>
        <div className="container overlay-text">
            <div className="inner-textbox">
                <img src={whiteLizrd} />
                <p className="life">Our app makes your life easier!</p>
                <a href="#" className="btn">Login/Sign-up</a>
            </div>
        </div>
    </section>
    <section id="features">
        <div className="container">
            <header>
                <h2>Features</h2>
            </header>
            <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
            </ul>
        </div>
    </section>
    <section id="pricing">
        <div className="container">
            <header>
                <h2>Pricing</h2>
            </header>
            <ul>
                <li>Plan 1: $9.99/month</li>
                <li>Plan 2: $19.99/month</li>
                <li>Plan 3: $29.99/month</li>
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