import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "./form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

function Form() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function validate() {
    if (name === "") {
      alert("Name is Empty");
      return false;
    } else if (!/^[A-Za-z -]{3,25}$/.test(name)) {
      alert("Invalid Name");
      return false;
    }
    if (phone === "") {
      alert("Phone number is Empty");
      return false;
    } else if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number");
      return false;
    }

    if (email === "") {
      alert("Email is Empty");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email address");
      return false;
    }
    return true;
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lrvr1jb",
        "template_mq28fsx",
        form.current,
        "PAOrqHdpZ-s8-o0BL"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      sendEmail(e);
      alert("Message Sent Successfully");
    }
  };

  return (
    <div className="bg-green-100 form-padding border-t-2 border-zinc-950" id="form">
      <Helmet>
        <title>Tri2champ</title>
        <link rel="icon" type="image/png" href="logo1.png" />
      </Helmet>
    <div className="form-container rounded-xl bg-emerald-800" >
    <p
          style={{ fontSize: "2rem", color: "white",textAlign:'center' }}
          className="tiltneon pb-3"
        >
          Connect to us
        </p>
      <form onSubmit={handleSubmit} ref={form} className="bgcolor ">
        
        <input
          name="from_name"
          type="text"
          id="from_name"
          value={name}
          className="rounded iinput mb-3 rounded-xl text-zinc-950 border-b-4 border-cyan-400 hover:border-2 pt-2 border-cyan-600 bg-gradient-to-b from-zinc-200 to-teal-200 rounded-xl"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          className="rounded iinput mb-3 rounded-xl text-zinc-950 border-b-4 border-cyan-400 hover:border-2 pt-2 border-cyan-600 bg-gradient-to-b from-zinc-200 to-teal-200 rounded-xl"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="phone"
          name="phone"
          id="phone"         
          className="rounded iinput mb-3 rounded-xl text-zinc-950 border-b-4 border-cyan-400 hover:border-2 pt-2 border-cyan-600 bg-gradient-to-b from-zinc-200 to-teal-200 rounded-xl"
          value={phone}
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          id="message"
          name="message"
          value={message}
          style={{color:'aliceblue'}}
          className="rounded iinput mb-3 rounded-xl text-zinc-950 border-b-4 border-cyan-400 hover:border-2 pt-2 border-cyan-600 bg-gradient-to-b from-zinc-200 to-teal-200 rounded-xl"
          placeholder="Feel free to ask anything"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button type="submit" className="rounded-pill bg-gradient-to-b hover:bg-gradient-to-b from-emerald-600 to-emerald-300 hover:from-emerald-300 hover:to-emerald-600 tiltneon bbutton">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default Form;