import React, { Component } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";

class Login extends Component { 
  constructor(props){
    super(props)
  }
  componentDidMount() {
    if (localStorage.getItem("TOKEN_KEY") != null) {     
        return this.props.history.push('/dashboard');
     }
   }
   submitForm = (values, history) => {
    axios
      .post("http://localhost:8080/login", values)
      .then(res => {
        if (res.data.result === "success") {
          localStorage.setItem("TOKEN_KEY", res.data.token);
          swal("Success!", res.data.message, "success")
         .then(value  => {
            history.push("/dashboard");
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", error, "error");
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit}>

      <div className="form-group has-feedback">
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={values.email}
          className={
            errors.email && touched.email
              ? "form-control is-invalid"
              : "form-control"
          }
          placeholder="Email"
        />
        {errors.email && touched.email ? (
          <small id="passwordHelp" class="text-danger">
            {errors.email}
          </small>
        ) : null}
      </div>
      <div className="form-group has-feedback">
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          className="form-control"
          placeholder="Password"
          className={
            errors.password && touched.password
              ? "form-control is-invalid"
              : "form-control"
          }
        />
        {errors.password && touched.password ? (
          <small id="passwordHelp" class="text-danger">
            {errors.password}
          </small>
        ) : null}
      </div>
     
      <div className="row">
        <div className="col-md-12">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary btn-block btn-flat"
          >
            Confirm
          </button>
        </div>
        {/* /.col */}
      </div>
    </form>
    )
  }
  render() {
    const SignupSchema = Yup.object().shape({
     
      email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
      password: Yup.string().required("Password is required")
    });
   
    
    return (
      <div className="hold-transition login-page">
      <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Story</b>Book</a>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Login</p>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.submitForm(values, this.props.history);
          setSubmitting(false);
        }}
      >
        {props => this.showForm(props)}
      </Formik>
   
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
  {/* /.login-box */}
</div>
</div>
    );
  }
}

export default Login;
