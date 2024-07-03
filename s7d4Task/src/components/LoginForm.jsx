import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", check: false },
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
  return (
    <div className="loginForm">
      <div className="formArea">
        <form onSubmit={handleSubmit(formSubmit)} className="form">
          <h3>LOGIN FORM</h3>

          <label htmlFor="email">Email:</label>
          <input type="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" />
          <div className="formCheckbox">
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1">Şartları kabul ediyorum</label>
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
