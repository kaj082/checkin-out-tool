"use client";
import React, { Suspense, useEffect } from "react";
import styles from "../../src/scss/Update.module.scss";
import AppSkeleton from "@/src/component/appskeleton/AppSkeleton";
import Loader from "@/src/component/loader/Loader";
import { withAuth } from "@/src/hoc/withAuthentication";
import Input from "@/src/component/input/Input";
import useUserStore from "@/src/zustand/useUserStore";

const page = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {}, []);

  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <AppSkeleton>
        <div className={styles.updateContainer}>
          <div className={styles.container}>
            <div className={styles.labelValue}>
              <p className={styles.label}>First Name</p>
              <div className={styles.input}>
                <Input
                  inputProps={{
                    readOnly: true,
                  }}
                  placeholder="First Name"
                  type="string"
                  value={user?.firstName}
                />
              </div>
            </div>
            <div className={styles.labelValue}>
              <p className={styles.label}>Last Name</p>
              <div className={styles.input}>
                <Input
                  inputProps={{
                    readOnly: true,
                  }}
                  placeholder="Last Name"
                  type="string"
                  value={user?.lastName}
                />
              </div>
            </div>

            <div className={styles.labelValue}>
              <p className={styles.label}>Phone</p>
              <div className={styles.input}>
                <Input
                  inputProps={{
                    readOnly: true,
                  }}
                  placeholder="Phone"
                  type="tel"
                  value={user?.mobile}
                />
              </div>
            </div>
          </div>
        </div>
      </AppSkeleton>
    </Suspense>
  );
};

export default withAuth(page);
