import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Form
} from "react-bootstrap";
import Logo from "./img/Logo.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup = () => {
  const [login, setLogin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const doRegister = async (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, password, confirmPassword);
  
    // Password validation criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
    
    // Email validation criteria
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;
    let error = "";

    if (!firstName.trim()) {
      error = "First name is required";
      isValid = false;
    } else if (!lastName.trim()) {
      error = "Last name is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      error = "Invalid email";
      isValid = false;
    }
    else if(!login.trim()){
      error = "Usernane is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      error = "Passwords don't match";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      error = "Password must be 8 characters long, one upper and lower case letter, and a special symbol";
      isValid = false;
    }

    if (!isValid) {
      setErrorMessage(error);
      return;
    }

    console.log("ALL FIELDS ARE CORRECT!");
    var obj = {login:login, password:password, firstName: firstName, lastName: lastName, email: email};
    var js = JSON.stringify(obj);
    try
    {
      const response = await fetch('http://localhost:5001/api/Register',{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
      var res = JSON.parse(await response.text());
      if( res.id <= 0 )
      {
        console.log('User/Password combination incorrect');
      }
      else
      {
        alert("SUCCESS!!");
        var user = {login:res.login, password:res.password, firstName:res.firstName, lastName:res.lastName, email: res.email, id:res.id}
        localStorage.setItem('user_data', JSON.stringify(user));
        window.location.href = '/home';
      }
    }
    catch(e)
    {
    alert(e.toString());
    return;
    }
    // Handle form submission
  };

  const redirectToLogin = () => {
    window.location.href = '/home'; // Specify the URL you want to navigate to
  };

  return (
    <Container fluid className="signupContainer">
      <Row className= "rowContainer">
        <Col className = "leftColumn" >
        <h2 className = "leftText">Virtual Vogue</h2>
        <Image className="image-holder" src={Logo}></Image>
        <h2 className = "leftText">Set the next trend!</h2>
        </Col>

        <Col className="rightColumn">
            <Form onSubmit={doRegister} className = "signupForm" >

            <h2 className = "signupTitle">SIGN UP</h2>

            {/* First name field */}
            <Form.Group controlId="idFirstName">
              <Form.Label classname = "form-label"> First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            {/* Last name field */}
            <Form.Group controlId="idLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            {/* Email field */}
            <Form.Group controlId="idEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* Login ID field */}
            <Form.Group controlId="idLogin">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>

            {/* Password field */}
            <Form.Group controlId="idPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/*Confirm Password field */}
            <Form.Group controlId="idConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {/* Error Message field*/}
            <p id="errorSignUp">{errorMessage}</p>

            <Button type="submit" id="signupButton" className="signupButtonsPage">Sign up</Button>
            <hr></hr>

             {/* Redirect to the login page */}
             <p className="loginQuestion">Already have an account?</p>
            <Button type="button" id="loginButton" className="signupButtonsPage" onClick={redirectToLogin}>Login</Button>

            </Form>
            </Col>
      </Row>
    </Container>
  );
};

export default Signup;
