import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: { email: "", password: "", checkbox: false },
    mode: "all",
  });

  const formSubmit = (formData) => {
    console.log(formData);
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        console.log(res.data);
        navigate("/success");
      })
      .catch((err) => console.warn(err));
  };

  const validatePassword = (value) => {
    return (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      ) ||
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
    );
  };

  return (
    <div className="loginForm">
      <div className="formArea" data-cy="formField">
        <form onSubmit={handleSubmit(formSubmit)} className="form">
          <h3>LOGIN FORM</h3>

          <label htmlFor="email">Email:</label>
          <input
            data-cy="emailInput"
            type="email"
            {...register("email", {
              required: "E-mail field cannot be left blank",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid e-mail address.",
              },
            })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p data-cy="emailError" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}

          <label htmlFor="password">Password:</label>
          <input
            data-cy="passwordInput"
            type="password"
            {...register("password", {
              validate: validatePassword,
            })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p data-cy="pswdError" style={{ color: "red" }}>
              {errors.password.message}
            </p>
          )}

          <div className="formCheckbox">
            <input
              data-cy="checkboxInput"
              type="checkbox"
              {...register("checkbox", {
                required: "You must accept the terms",
              })}
              defaultChecked={false}
            />
            <label htmlFor="checkbox">Şartları kabul ediyorum</label>
          </div>
          {errors.checkbox && (
            <p data-cy="checkError" style={{ color: "red" }}>
              {errors.checkbox.message}
            </p>
          )}

          <button
            data-cy="submitBtn"
            type="submit"
            disabled={!isValid}
            className="loginBtn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
