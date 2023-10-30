import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { signIn, UserAuth } from "../context/AuthContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const {
    userExistsError,
    setUserExistsError,
    pwLengthError,
    pwError,
    setPwError,
  } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      if (userExistsError === "true" || pwLengthError === "true") {
        return;
      } else if (pwError.length > 0) {
        return;
      } else {
        navigate("/account");
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  const passwordHandler = (e) => {
    setPwError("");
    setUserExistsError(false);
    setPassword(e.target.value);
  };

  const emailHandler = (e) => {
    setPwError("");
    setUserExistsError(false);
    setEmail(e.target.value);
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-4 py-20">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="">Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => emailHandler(e)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => passwordHandler(e)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="password"
                autoComplete="off"
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign in
          </button>

          {userExistsError && (
            <p className="text-red-600 mt-4 text-[1.2rem]">
              User Already Exists - please sign in
            </p>
          )}

          {pwError.length > 0 && (
            <p className="text-red-600 mt-4 text-[1.2rem]">
              Incorrect Email/Password - please try again
            </p>
          )}
        </form>
        <p className="my-4">
          Don't have an account?{" "}
          <Link className="text-accent" to="/signup">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignIn;
