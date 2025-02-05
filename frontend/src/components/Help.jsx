import React from "react";
import phone from "../images/phone.png";
import email from "../images/email.png";
import github from "../images/github.png";
import location from "../images/location.jpg";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

const Help = () => {
  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="contact_info_row">
            <div className="contact_info_item">
              <img src={phone} alt="Phone Icon" className="contact_icon" />
              <div className="contact_info_content">
                <div className="contact_info_title">Phone</div>
                <div className="contact_info_text">+91 9765679908</div>
              </div>
            </div>
            <div className="contact_info_item">
              <img src={email} alt="Email Icon" className="contact_icon" />
              <div className="contact_info_content">
                <div className="contact_info_title">Email</div>
                <div className="contact_info_text">
                  ambikayemul2001@gmail.com
                </div>
              </div>
            </div>
            <div className="contact_info_item">
              <img
                src={location}
                alt="Location Icon"
                className="contact_icon"
              />
              <div className="contact_info_content">
                <div className="contact_info_title">Address</div>
                <div className="contact_info_text">Pune, MH, India</div>
              </div>
            </div>
            <div className="contact_info_item">
              <img src={github} alt="GitHub Icon" className="contact_icon" />
              <div className="contact_info_content">
                <div className="contact_info_title">GitHub</div>
                <div className="contact_info_text">
                  <a href="https://github.com/yemulambika">
                    https://github.com/yemulambika
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}
      <div className='"contact-form'>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="conatct_form_name"
                      className="contact_form_name input_field"
                      placeholder="Your Name"
                      required="true"
                    />
                    <input
                      type="email"
                      id="conatct_form_email"
                      className="contact_form_email input_field"
                      placeholder="Your email"
                      required="true"
                    />
                    <input
                      type="number"
                      id="conatct_form_phone"
                      className="contact_form_phone input_field"
                      placeholder="Phone No"
                      required="true"
                    />
                  </div>
                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_field contact_form_message"
                      placeholder="Feedback"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    {" "}
                    <button
                      type="submit"
                      className="button contact_submit_button"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
