import React from "react";
import Layout from "../components/UI/Layout";
import SignIn from "../components/UI/SignIn";

const LoginPage = () => {
  return (
    <Layout>
      <div className="bg-white">
        <SignIn />
      </div>
    </Layout>
  );
};

export default LoginPage;