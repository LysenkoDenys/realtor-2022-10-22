import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  function onChange(e) {
    setEmail(e.target.value);
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12">
        <div className="md:w-[40%] lg[20%] mb-12 md:mb-6 max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1634979149798-e9a118734e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            alt="key"
            className="w-full rounded-2xl"
          ></img>
        </div>
        <div className="w-full md:w-[40%] lg[10%] lg:ml-10">
          <form>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <div className="relative" mb-6></div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 ">
                Don`t have an account?
                <Link
                  to="/sign-up"
                  className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send recent password
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-grey-300 after:border-t after:flex-1 before:border-grey-300">
              <p className="text-center font-semibold mx-4 items-center before:border-gray-300">
                OR
              </p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
