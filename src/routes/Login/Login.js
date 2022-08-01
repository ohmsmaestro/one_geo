import React from "react";

import { Input, Checkbox } from "../../components/Input.components";
import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";

import { calcViewMode } from "../../utils/utils";
import { endpoint } from "../../utils/config";

import LOGO from "../../assets/img/logo.png";
import LOGIN_BG from "../../assets/img/gis-landing.png";

import { Theme } from "../../utils/theme";

export const Login = (props) => {
  const { form, isLoading, login, redirect } = props;
  const { getFieldProps, getFieldError, validateFields } = form;
  let viewMode = calcViewMode();

  const onLogin = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          username: value.username.trim(),
          password: value.password,
        };

        login(data);
      }
    });
  };

  const onEnter = (e) => {
    e.stopPropagation();
    e.key === "Enter" && onLogin();
  };

  let errors;

  return (
    <>
      <Grid desktop="40% 60%" tablet="40% 60%" mobile="100%">
        <Boxed display="flex" width="100%" minHeight="100vh">
          <Boxed margin="auto">
            <Boxed pad="10px 0">
              <img src={LOGO} height="100px" alt="app_logo" />
            </Boxed>
            <Text fontSize="24px" fontWeight="bold" margin="5px 0">
              Welcome back
            </Text>
            <Text margin="5px 0">Please log in to your account.</Text>
            <Boxed margin="20px 0">
              <Input
                label="Email or Phone Number"
                type="email"
                placeholder="Your Email..."
                error={
                  (errors = getFieldError("username"))
                    ? "Email or phone number is required"
                    : null
                }
                {...getFieldProps("username", {
                  initialValue: "",
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed margin="20px 0">
              <Input
                label="Password"
                type="password"
                placeholder="Your Password..."
                onKeyPress={onEnter}
                error={
                  (errors = getFieldError("password"))
                    ? "Password is required"
                    : null
                }
                {...getFieldProps("password", {
                  initialValue: "",
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Grid
              desktop="repeat(2, 1fr)"
              tablet="repeat(2, 1fr)"
              mobile="repeat(2, 1fr)"
              pad="5px 0"
            >
              {/* <Boxed pad="10px 0">
                <Checkbox
                  label="Remember Me"
                  onClick={(value) => console.log(value)}
                />
              </Boxed> */}
              <Boxed pad="10px 0">
                {/* <Text
                  cursor="pointer"
                  color={Theme.PrimaryRed}
                  onClick={() => redirect("/forgotpassword")}
                >
                  Forgot password?
                </Text> */}
              </Boxed>
            </Grid>
            <Grid
              desktop="repeat(2, 1fr)"
              tablet="repeat(2, 1fr)"
              mobile="repeat(2, 1fr)"
              pad="25px 0 0 0"
            >
              <Boxed pad="5px 0 0 0">
                <Button
                  disabled={isLoading}
                  progress={isLoading}
                  block
                  onClick={onLogin}
                >
                  SIGN IN
                </Button>
              </Boxed>
              {/* <Boxed pad="5px 0 0 0">
                <Button
                  clear
                  block
                  color={Theme.PrimaryBlue}
                  onClick={() => redirect("/signup")}
                >
                  <i className="icon-chevron-left" /> Sign Up
                </Button>
              </Boxed> */}
            </Grid>
          </Boxed>
        </Boxed>

        {viewMode !== "mobile" && (
          <Boxed display="flex" width="100%" height="100%">
            <img
              src={LOGIN_BG}
              height="100%"
              alt="login_bg"
              width="100%"
              style={{ margin: "auto" }}
            />
          </Boxed>
        )}
      </Grid>
    </>
  );
};
