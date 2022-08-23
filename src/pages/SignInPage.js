import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Field from "../components/field/Field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase-app/firebase-config";
import PropTypes from "prop-types";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
  email: yup
    .string()
    .email("please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  useEffect(() => {
    const arrErroes = Object.values(errors);

    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message);
    }
  }, [errors]);

  const { userInfo } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password"> Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Don't have an account yet?{" "}
          <NavLink to={"/sign-up"}> Register your account </NavLink>
          {""}
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          kind="primary"
          disabled={isSubmitting}
          style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]).isRequired,
};

export default SignInPage;
