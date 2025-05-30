"use client";
import Loader from "@/src/component/loader/Loader";
import React, { Suspense, useState } from "react";
import styles from "../../src/scss/Login.module.scss";
import Input from "@/src/component/input/Input";
import { useForm } from "react-hook-form";
import Button from "@/src/component/button/Button";
import { routesConstants } from "@/src/constants";
import { useRouter } from "next/navigation";
import useUserStore from "@/src/zustand/useUserStore";
import { userAction } from "@/src/actions";
import axiosInstance from "@/axios";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    const res = await userAction.userRegister(data);
    if (res.success) {
      const token = res.data.token;
      localStorage.setItem("token", res.data.token);
      console.log(token, "token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setUser({
        userId: res.data.data.userId,
        firstName: res.data.data.firstName,
        lastName: res.data.data.lastName,
        mobile: res.data.data.mobile,
      });
      setIsLoading(false);
      router.push(routesConstants.ROUTES.HOME);
    } else {
      setIsLoading(false);
    }
  };

  const {} = useUserStore();
  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <section className={`${styles.container} py-4`}>
        <div className={styles.boxLogin}>
          <h1 className={styles.title}>Sign Up</h1>

          <form className={styles.box} onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="First Name"
              inputProps={{
                ...register("firstName", {
                  required: "First name is required",
                }),
              }}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              placeholder="Last Name"
              inputProps={{
                ...register("lastName", { required: "Last name is required" }),
              }}
              error={errors.lastName?.message}
            />

            <Input
              type="tel"
              placeholder="Mobile"
              inputProps={{
                type: "tel",
                maxLength: 10,
                ...register("mobile", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                }),
              }}
              error={errors.mobile?.message}
            />

            <Input
              type="string"
              placeholder="Password"
              className={styles.input}
              inputProps={{
                ...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,32}$/,
                    message:
                      "Password must have uppercase, lowercase, number and special char",
                  },
                }),
              }}
              error={errors.password?.message}
            />
            <Input
              type="string"
              placeholder="Confirm Password"
              inputProps={{
                ...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }),
              }}
              error={errors.confirmPassword?.message}
            />
            <Button
              isLoading={isLoading}
              btnText="Sign Up"
              type="primary"
              className={styles.LoginBtn}
            />

            <div className={styles.account}>
              <div className={styles.line1}></div>
              <p className={styles.text2}>Already have an account?</p>
              <div className={styles.line2}></div>
            </div>
            <Button
              isLoading={false}
              type="secondary"
              btnText="Sign In"
              className={styles.SignupBtn}
              buttonProps={{
                onClick: () => router.push(routesConstants.ROUTES.LOGIN),
                type: "button",
              }}
            />
          </form>
        </div>
      </section>
    </Suspense>
  );
};

export default page;
