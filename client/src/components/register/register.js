import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";

class Register extends Component {

  submitForm = (values, history) => {
    axios
      .post("http://localhost:8080/user/register", values)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success")
          .then(value => {
            history.push("/login");
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", "Unexpected error", "error");
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
          name="username"
          onChange={handleChange}
          value={values.username}
          className="form-control"
          placeholder="Username"
          className={
            errors.username && touched.username
              ? "form-control is-invalid"
              : "form-control"
          }
        />
        {errors.username && touched.username ? (
          <small id="passwordHelp" class="text-danger">
            {errors.username}
          </small>
        ) : null}
      </div>
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
      <div className="form-group has-feedback">
        <input
          type="password"
          name="confirm_password"
          onChange={handleChange}
          className={
            errors.confirm_password && touched.confirm_password
              ? "form-control is-invalid"
              : "form-control"
          }
          placeholder="Confirm Password"
        />
        {errors.confirm_password && touched.confirm_password ? (
          <small id="passwordHelp" class="text-danger">
            {errors.confirm_password}
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
      username: Yup.string()
        .min(2, "username is Too Short!")
        .max(50, "username is Too Long!")
        .required("username is Required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is Required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Both password need to be the same"
      )
    });
    
    return (
      <div className="hold-transition register-page">
      <div className="register-box">
  <div className="register-logo">
    <a href="../../index2.html"><b>Story</b>Book</a>
  </div>
  <div className="card">
    <div className="card-body register-card-body">
      <p className="login-box-msg">Register a new membership</p>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
          confirm_password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.submitForm(values, this.props.history);
          setSubmitting(false);
        }}
      >
        {props => this.showForm(props)}
      </Formik>
   
      <a href="login.html" className="text-center">I already have a membership</a>
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
  {/* /.register-box */}
</div>
</div>
    );
  }
}

export default Register;
