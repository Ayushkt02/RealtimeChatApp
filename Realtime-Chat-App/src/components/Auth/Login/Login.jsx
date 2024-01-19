import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import firebase from "../../../server/firebase.js";
// import { databse } from "../../../server/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  let user = {
    email: "",
    password: "",
  };
  let errors = [];

  let [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const handleInput = (event) => {
    let target = event.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please Fill All fields" })
      );
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return !userState.email.length || !userState.password.length;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    seterrorState(() => []);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false);
          console.log(user);
          navigate('/');
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    } else {
    }
  };
  
  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <section>
      <div className="m-auto">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-3xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
            <p className="mt-2 text-center text-sm text-gray-600 ">
              Don&#x27;t have an account?{" "}
              <a
                href="Register"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Create an account
              </a>
            </p>
            <form onSubmit={onSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={userState.email}
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userState.password}
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isLoading}
                    loading={isLoading.toString()}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            {errorState.length > 0 && (
              <Message error>
                <h3>Errors</h3>
                {formatErrors()}
              </Message>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
