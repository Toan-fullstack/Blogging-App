import React, { useState } from "react";

import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";

import Field from "../components/field/Field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import slugify from "slugify";

const schema = yup.object({
  fullname: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .email("please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate(); //after create account swich to home page
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log(values);
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
    });
    // await addDoc(colRef, {
    //   name: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });
    toast.success("Register Successfully!!");
    navigate("/");
  };

  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErroes = Object.values(errors);

    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message);
    }
  }, [errors]);
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="fullname">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>{" "}
        </div>
        <Button
          type="submit"
          kind="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
