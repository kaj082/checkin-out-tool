"use client";

import React, { Suspense, useState } from "react";
import styles from "../../src/scss/Login.module.scss";
import Input from "@/src/component/input/Input";
import Loader from "@/src/component/loader/Loader";
import { useForm } from "react-hook-form";
import Button from "@/src/component/button/Button";
import { routesConstants } from "@/src/constants";
import { useRouter } from "next/navigation";
import useUserStore from "@/src/zustand/useUserStore";
import { userAction } from "@/src/actions";
import axiosInstance from "@/axios";

interface LoginFormInputs {
  mobile: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    const res = await userAction.userLogin(data);
    if (res.success) {
      router.push(routesConstants.ROUTES.HOME);
      const token = res.data.token;
      localStorage.setItem("token", res.data.token);

      setUser({
        userId: res.data.data.userId,
        firstName: res.data.data.firstName,
        lastName: res.data.data.lastName,
        mobile: res.data.data.mobile,
      });
    }

    setIsLoading(false);
  };

  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <section className={styles.container}>
        <div className={styles.boxLogin}>
          <h1 className={styles.title}>Login</h1>

          <form className={styles.box} onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="tel"
              placeholder="Mobile"
              inputProps={{
                type: "tel",
                ...register("mobile", { required: true }),
              }}
              className={styles.input}
              error={errors.mobile?.message}
            />
            <Input
              type="string"
              placeholder="Password"
              className={styles.input}
              inputProps={{
                type: "string",
                ...register("password", { required: true }),
              }}
              error={errors.password?.message}
            />
            <Button
              isLoading={isLoading}
              btnText="Login"
              type="primary"
              className={styles.LoginBtn}
            />

            <div className={styles.account}>
              <div className={styles.line1}></div>
              <p className={styles.text2}>Don’t have an account?</p>
              <div className={styles.line2}></div>
            </div>
            <Button
              isLoading={false}
              type="secondary"
              btnText="Sign Up"
              className={styles.SignupBtn}
              buttonProps={{
                onClick: () => router.push(routesConstants.ROUTES.REGISTER),
              }}
            />
          </form>
        </div>
      </section>
    </Suspense>
  );
};

export default page;
