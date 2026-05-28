import React, { useContext, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      context.openAlertBox(
        "error",
        "Please enter your email"
      );
      return;
    }

    try {

      setIsLoading(true);

      const response = await postData(
        "/api/user/forgot-password",
        {
          email: email.trim(),
        }
      );

      if (response?.success) {

        context.openAlertBox(
          "success",
          response?.message || "OTP sent successfully"
        );

        // save email
        localStorage.setItem(
          "userEmail",
          email.trim()
        );

        
        navigate("/verify");

      } else {

        context.openAlertBox(
          "error",
          response?.message || "Failed to send OTP"
        );
      }

    } catch (error) {

      console.error(error);

      context.openAlertBox(
        "error",
        "Something went wrong"
      );

    } finally {

      setIsLoading(false);
    }
  };

  return (
    <section className="section py-10">

      <div className="container">

        <div className="card shadow-md w-[400px] max-w-[95%] m-auto rounded-md bg-white p-5 px-10">

          <h3 className="text-center text-[22px] text-black font-semibold">
            Forgot Password
          </h3>

          <p className="text-center text-[14px] text-gray-500 mt-2 mb-5">
            Enter your registered email to receive OTP
          </p>

          <form
            className="w-full mt-5"
            onSubmit={handleSubmit}
          >

       
            <div className="form-group w-full mb-5">

              <TextField
                type="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={email}
                disabled={isLoading}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

        
            <Button
              type="submit"
              disabled={!email || isLoading}
              className="btn-org btn-lg w-full flex gap-3"
            >

              {
                isLoading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                ) : (
                  "SEND OTP"
                )
              }

            </Button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default ForgotPassword;
