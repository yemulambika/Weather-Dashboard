import React, { useState } from "react";
import "./login.css";
import signup from "../images/signup.avif"; // Ensure this path is correct
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        if (!name || !email || !phone || !work || !password || !cpassword) {
            window.alert("Please fill all the fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    work,
                    password,
                    cpassword,
                }),
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                window.alert(data.error || "Invalid Registration");
            } else {
                window.alert("Registration Successful");
                navigate("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            window.alert("Server Error");
        }
    };

    return (
        <section className="signup">
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account"></i>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="off"
                                    value={user.name}
                                    onChange={handleInputs}
                                    style={{"paddingLeft":"30px"}}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email"></i>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInputs}
                                    style={{"paddingLeft":"30px"}}
                                    placeholder="Your Email"
                                
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone-in-talk"></i>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={user.phone}
                                    onChange={handleInputs}
                                    style={{"paddingLeft":"30px"}}
                                    placeholder="Phone No"

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="work">
                                    <i className="zmdi zmdi-slideshow"></i>
                                </label>
                                <input
                                    type="text"
                                    name="work"
                                    id="work"
                                    autoComplete="off"
                                    value={user.work}
                                    onChange={handleInputs}
                                    style={{"paddingLeft":"40px"}}
                                    placeholder="Your Profession"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock"></i>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInputs}
                                    style={{"paddingLeft":"30px"}}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword">
                                    <i className="zmdi zmdi-lock"></i>
                                </label>
                                <input
                                    type="password"
                                    name="cpassword"
                                    id="cpassword"
                                    autoComplete="off"
                                    value={user.cpassword}
                                    onChange={handleInputs}
                                    style={{"paddingLeft":"30px"}}
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <div className="form-group form-button">
                                <input
                                    type="submit"
                                    name="signup"
                                    id="signup"
                                    className="form-submit"
                                    value="Register"
                                    onClick={PostData}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure>
                            <img src={signup} alt="signup" />
                        </figure>
                        <NavLink to="/" className="signup-image-link">
                            I am already registered
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
