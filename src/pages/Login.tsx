import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const validator = useRef(new SimpleReactValidator());
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        setLoading(true);
        await login(email, password);
        navigate("/voters");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      validator.current.showMessages();
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-5 xl:min-h-[800px] h-screen globe-background bg-cover bg-center px-4 lg:p-0">
      <div className="hidden lg:block lg:col-span-3"></div>
      <div className="flex items-center justify-center py-12 lg:bg-white lg:col-span-2 h-screen">
        <div className="mx-auto grid w-[400px] gap-6 bg-white px-4 py-10 sm:p-10 lg:p-4 rounded-md">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Election Dashboard</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                className={
                  validator.current.message("email", email, "required|email")
                    ? "border-rose-500"
                    : ""
                }
                placeholder="user@frethinkers.com"
                onChange={(e) => {
                  {
                    setEmail(e.target.value);
                    validator.current.showMessageFor("email");
                  }
                }}
                onBlur={() => validator.current.showMessageFor("email")}
              />
              {validator.current.message("email", email, "required|email", {
                className: "text-rose-500 text-sm",
              })}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm text-slate-400"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                required
                id="password"
                type="password"
                autoComplete="password"
                value={password}
                className={
                  validator.current.message(
                    "password",
                    password,
                    "required|min:6|max:30"
                  )
                    ? "border-rose-500"
                    : ""
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  validator.current.showMessageFor("password");
                }}
                onBlur={() => validator.current.showMessageFor("password")}
              />
              {validator.current.message(
                "password",
                password,
                "required|min:6|max:30",
                {
                  className: "text-rose-500 text-sm",
                }
              )}
            </div>
            <Button type="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </form>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div> */}
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
