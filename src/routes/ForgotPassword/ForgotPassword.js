import React from "react";

import { Input, Checkbox } from "../../components/Input.components";
import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";

import { calcViewMode } from "../../utils/utils";

import LOGO from "../../assets/img/logo.png";
import LOGIN_BG from "../../assets/img/gis-landing.png";

import { Theme } from "../../utils/theme";

export const ForgotPassword = (props) => {
  const { form, isLoading, login, redirect, forgotPassword } = props;
  const { getFieldProps, getFieldError, validateFields } = form;
  let viewMode = calcViewMode();

  const onForgotPassword = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          email: value.email.trim(),
        };
        forgotPassword(data);
      }
    });
  };

  const onEnter = (e) => {
    e.stopPropagation();
    e.key === "Enter" && onForgotPassword();
  };
  let errors;

  return (
    <>
      <Grid desktop="40% 60%" tablet="40% 60%" mobile="100%">
        <Boxed display="flex" width="100%" minHeight="100vh">
          <Boxed margin="auto">
            <Boxed display="flex" width="100%" minHeight="100vh">
              <Boxed margin="auto" minWidth="300px">
                <Boxed pad="10px 0">
                  <img src={LOGO} height="50px" alt="app_logo" />
                </Boxed>
                <Text margin="1rem 0" fontWeight="600" fontSize="24px">
                  Reset Link
                </Text>
                <Text margin="1rem 0">
                  Enter your email address to get a password resent link.
                </Text>
                <Boxed margin="20px 0">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Your email address..."
                    onKeyPress={onEnter}
                    error={
                      (errors = getFieldError("email"))
                        ? "Email is required"
                        : null
                    }
                    {...getFieldProps("email", {
                      initialValue: "",
                      rules: [{ required: true, type: "email" }],
                    })}
                  />
                </Boxed>

                <Button onClick={onForgotPassword}>Send Link</Button>
                <Button
                  clear
                  color={Theme.PrimaryBlue}
                  onClick={() => redirect("/")}
                >
                  <icon className="icon-chevron-left" /> Back to Sign In
                </Button>
              </Boxed>
            </Boxed>
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
