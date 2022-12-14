import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllContext } from "../../contexts/Context/ContextProvider";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const { signIn, providerLogin } = useContext(AllContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [error, setError] = useState(null);

  const loginHandle = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((e) => {
        setError(e.message);
        form.reset();
      });
  };
  const googleLogInHandle = (event) => {
    event.preventDefault();

    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((e) => setError(e.message));
  };
  const githubLogInHandle = (event) => {
    event.preventDefault();

    providerLogin(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((e) => setError(e.message));
  };
  return (
    <div className=" text-left mx-auto bg-secondary w-4/5 md:w-1/2 p-8 md:p-16 rounded-xl">
      <h2 className="text-2xl my-4">Please login</h2>
      <form onSubmit={loginHandle}>
        <div className="my-4">
          <label htmlFor="inputEmail">Email</label>
          <br />
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            className="p-2 rounded-lg w-full"
            required
          ></input>
        </div>
        <div className="my-4">
          <label htmlFor="inputPassword">Password</label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            className="p-2 rounded-lg w-full"
            required
          ></input>
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Log In
          </button>
        </div>

        <div className="my-4 text-red-600">{error}</div>
        <div className="mt-4">
          New to this website?{" "}
          <Link to="/register" className="underline">
            Register here
          </Link>
        </div>
        <div className="text-center flex flex-col items-center">
          <hr className="bg-black h-1 mt-4 w-5/6" />
          <button
            className="btn btn-primary w-4/6 mt-4"
            onClick={googleLogInHandle}
          >
            Log in with Google <FaGoogle className=" ml-2" />
          </button>
          <button
            className="btn btn-primary w-4/6 mt-4"
            onClick={githubLogInHandle}
          >
            Log in with GitHub <FaGithub className=" ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
