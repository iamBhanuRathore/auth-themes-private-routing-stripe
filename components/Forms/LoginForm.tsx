"use client";
import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { loginButtons } from "@/config/login-logo";
import { useSearchParams } from "next/navigation";
export default function LoginForm() {
  const [loggingIn, setLoggingIn] = useState(false);
  const searchParams = useSearchParams();
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const loginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: searchParams?.get("from") || "/serverpage",
    })
      .then((res) => {
        if (res?.error) {
          console.log(res);
          alert("Login failed : " + res.error);
        }
        // alert("Logged In SuccessFully!!");
        // console.log({ res });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center bg-primary-1 w-fit h-fit rounded-xl mx-auto px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-300 text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full px-10 py-5 rounded-lg bg-primary-2 sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 dark:bg-gray-700 dark:text-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 dark:bg-gray-700 dark:text-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loggingIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <p>Sign In With Different Social Accounts</p>
              <div className="flex justify-around">
                {loginButtons.map((item) => (
                  <button
                    type="button"
                    disabled={loggingIn}
                    onClick={() => {
                      setLoggingIn(true);
                      signIn(item.name, {
                        callbackUrl: searchParams?.get("from") || "/serverpage",
                      }).finally(() => {
                        setLoggingIn(false);
                      });
                    }}
                    title={`Sign In With ` + item.name}
                    key={item.name}
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={30}
                      height={30}
                    />
                  </button>
                ))}
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm dark:text-gray-300 text-gray-900">
            Not a member?
            <a
              href="#"
              className="font-semibold leading-6 text-gray-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
