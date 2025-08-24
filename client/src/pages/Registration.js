import axios from "axios";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validateYupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be less than 15 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(20, "Password must be less than 20 characters")
      .required("Password is required"),
  });

  const onSubmit = (data, { setSubmitting, setFieldError }) => {
    setIsLoading(true);
    
    axios.post("http://localhost:3001/users", data)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setFieldError('username', 'Username already exists');
        } else {
          setFieldError('username', 'Registration failed. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
        setSubmitting(false);
      });
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to Our Community!</h1>
            <p>Your account has been created successfully. You're now ready to share your Nordic adventures!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join Our Travel Community</h1>
          <p>Create an account to start sharing your authentic Nordic adventures and connect with fellow travelers</p>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validateYupSchema}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <div className="form-group">
                <label>Username</label>
                <ErrorMessage name="username" component={"span"} className="error-message" />
                <Field 
                  name="username" 
                  placeholder="Choose a unique username"
                  className="auth-input"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <ErrorMessage name="password" component={"span"} className="error-message" />
                <Field 
                  name="password" 
                  placeholder="Create a secure password"
                  type="password" 
                  className="auth-input"
                />
              </div>

              <button 
                type="submit" 
                className="auth-button"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
