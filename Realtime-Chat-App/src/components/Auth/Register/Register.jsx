import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import firebase from "../../../server/firebase.js";
// import { databse } from "../../../server/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  let user = {
    Username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  let errors = [];

  let userCollectionRef = firebase.database().ref("users");

  let [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    } else if (checkPassword() != 2) {
      if (checkPassword() == 0) {
        seterrorState((error) =>
          error.concat({
            message: "Password size must be greater than or equal to 8",
          })
        );
      } else {
        seterrorState((error) =>
          error.concat({
            message: "Password and confirm Password does not match",
          })
        );
      }
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.Username.length ||
      !userState.email.length ||
      !userState.password.length ||
      !userState.confirmpassword.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      return 0;
    } else if (userState.password !== userState.confirmpassword) {
      return 1;
    }
    return 2;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    seterrorState(() => []);
    setIsSuccess(false);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createdUser) => {
          setIsLoading(false);
          updateuserDetails(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    } else {
    }
  };

  const updateuserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);
      createdUser.user
        .updateProfile({
          displayName: userState.Username,
          photoURL: `https://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        })
        .then(() => {
          setIsLoading(false);
          saveUserInDB(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((serverError) => {
        setIsLoading(false);

        seterrorState((error) => error.concat(serverError));
      });
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <section>
      <div className="m-auto">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Register
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <a
                href="Login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
            <form onSubmit={onSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      name="Username"
                      value={userState.Username}
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Confirm Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Confirm Password"
                      value={userState.confirmpassword}
                      name="confirmpassword"
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
                    Create Account
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

            {isSuccess && (
              <Message success>
                <h3>Successfully Registered</h3>
              </Message>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
