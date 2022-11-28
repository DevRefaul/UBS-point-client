import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authentication } from "../../Contexts/Auth/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // login functions from contxt
  const {
    handleCreateUser,
    handleGoogleSignIn,
    // handleFacebookSignIn,
    handleGithubSignIn,
    handleUpdateUserInfo,
    setLoading,
  } = useContext(Authentication);

  // handle register
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.accountType.value;
    const password = form.password.value;
    const sellerVerified = "false";

    const userInfo = { name, email, role, sellerVerified };

    handleCreateUser(email, password)
      .then((data) => {
        const user = data.user;
        if (user?.uid) {
          handleUpdateUserInfo(userInfo)
            .then(() => {
              handleCreateUserInDB(userInfo);
              navigate(from, { replace: true });
              toast.success("Successfully Created User");
            })
            .catch((err) => console.error(err.message));
        }
      })
      .catch((err) => console.error(err.message));
  };


  // google login
  const handleGoogleLogin = () => {
    handleGoogleSignIn()
      .then((data) => {
        const user = data.user;

        if (user?.uid) {
          const userInfo = {
            name: user.displayName,
            email: user.email,
            role: "buyer",
          };
          // passing data to db function to save user in database
          handleCreateUserInDB(userInfo);
          toast.success("Successfully Logged In");
          setLoading(false);
        }
      })
      .catch((err) => console.error(err.message));
  };

  // github login
  const handleGithubLogin = () => {
    handleGithubSignIn()
      .then((data) => {
        const user = data.user;
        if (user?.uid) {
          const userInfo = {
            name: user.displayName,
            email: user.email,
            role: "buyer",
          };
          // passing data to db function to save user in database
          handleCreateUserInDB(userInfo);
          toast.success("Successfully Logged In");
          setLoading(false);
        }
      })
      .catch((err) => console.error(err.message));
  };

  // creating user in database
  const handleCreateUserInDB = (user) => {
    fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err.message));
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white text-black border-2 border-green-500">
          <h1 className="text-2xl font-bold text-center">Register</h1>
          <form
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
            onSubmit={handleRegister}
          >
            {/* user name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block text-gray-800">
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400"
              />
            </div>
            {/* user name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400"
              />
            </div>
            {/* user name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="accountType" className="block text-gray-800">
                Account Type
              </label>
              <select
                name="accountType"
                id="accountType"
                defaultValue="buyer"
                className="w-full px-4 py-3 rounded-md border-green-500 border-2"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* password field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border-green-500 border-2 bg-white text-black focus:border-orange-400"
              />
            </div>

            {/* btn */}
            <button
              type="submit"
              className="block w-full p-3 font-bold text-center border-transparent rounded-sm text-white bg-green-400 hover:bg-white hover:text-green-500 hover:border-green-500 border-2"
            >
              Register
            </button>
          </form>

          {/* social logins */}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
            <p className="px-3 text-sm text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              aria-label="Log in with Google"
              className="p-3 rounded-sm"
              onClick={handleGoogleLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>

            {/* facebook login */}
            {/* <button
              aria-label="Log in with Facebook"
              className="p-3 rounded-sm"
              onClick={handleFacebookLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 48 48"
              >
                <linearGradient
                  id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                  x1="9.993"
                  x2="40.615"
                  y1="9.993"
                  y2="40.615"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#2aa4f4"></stop>
                  <stop offset="1" stopColor="#007ad9"></stop>
                </linearGradient>
                <path
                  fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                  d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                ></path>
                <path
                  fill="#fff"
                  d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                ></path>
              </svg>
            </button> */}

            {/* github login */}
            <button
              aria-label="Log in with GitHub"
              className="p-3 rounded-sm"
              onClick={handleGithubLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-[40px] h-[40px] fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
          </div>

          {/* social login end */}

          <p className="text-xs text-center sm:px-6 text-gray-400">
            Already have an account?
            <Link
              rel="noopener noreferrer"
              to="/login"
              className="underline text-orange-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
