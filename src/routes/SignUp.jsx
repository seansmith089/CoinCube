import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("")
  const [pwMismatch, setPwMismatch] = useState(false)
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const { userExistsError, pwLengthError,setPwLengthError, pwError } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(password !== passwordConf){
        setPwMismatch(true)
        setPassword("")
        setPasswordConf("")
        return
    }else{
         try {
           await signUp(email, password);
           if (
             userExistsError === "true" ||
             pwLengthError === "true" ||
             pwError === "true"
           ) {
             return;
           } else {
             navigate("/account");
           }
         } catch (e) {
           setError(e.message);
           console.log(e.message);
         }
    }

   
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    setPwMismatch(false)
    setPwLengthError(false);
  }

  const passwordConfHandler = (e) => {
    setPasswordConf(e.target.value);
    setPwMismatch(false);
    setPwLengthError(false);
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-4 py-20">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="">Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                autoComplete="off"
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
            <label>Confirm Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => passwordConfHandler(e)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="password"
                value={passwordConf}
                autoComplete="off"
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
            {pwMismatch && (
              <p className="text-red-500">Passwords do not match</p>
            )}
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign Up
          </button>

          {pwLengthError && (
            <p className="text-red-600 mt-4 text-[1.2rem]">
              Password must be more than 6 characters
            </p>
          )}
        </form>
        <p className="my-4">
          Already have an account?{" "}
          <Link className="text-accent" to="/signin">
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignUp;
