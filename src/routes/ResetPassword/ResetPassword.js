import React from "react";

import { Input } from "../../components/Input.components";
import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";

import { calcViewMode } from "../../utils/utils";

import LOGO from "../../assets/img/logo.png";
import LOGIN_BG from "../../assets/img/gis-landing.png";
import { Theme } from "../../utils/theme";

export const ResetPassword = (props) => {
  const { form, resetPassword, loadingBtn, token, redirect } = props;
  const { getFieldProps, getFieldError, validateFields, getFieldValue } = form;
  let viewMode = calcViewMode();

  const checkConfirmPassword = (value1, rule, value, callback, source) => {
    if (value !== value1) {
      callback("Passwords must match");
    } else {
      callback();
    }
  };

  const checkPassword = (value1, rule, value, callback, source) => {
    if (value) {
      let length = value.length;
      let checkLength = length > 7;

      if (checkLength) {
        let numberTest = /\d/.test(value);
        let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        let specialCharaterTest = value.match(format);
        if (numberTest || specialCharaterTest) {
          callback();
        } else {
          callback("Password must contain either a digit or special charater.");
        }
      } else {
        callback("Password must be atleast 8 characters");
      }
    } else {
      callback();
    }
  };

  const onResetPassword = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          token,
          new_password: value.password,
          confirm_password: value.confirmPassword,
        };
        resetPassword(data);
      }
    });
  };

  const onEnter = (e) => {
    e.stopPropagation();
    e.key === "Enter" && onResetPassword();
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
                  Password Reset
                </Text>
                <Text margin="1rem 0">
                  Fill the form belowto change your password.
                </Text>
                <Boxed margin="20px 0">
                  <Input
                    type="password"
                    placeholder="New Password..."
                    onKeyPress={onEnter}
                    error={
                      getFieldError("password")
                        ? getFieldError("password")
                        : null
                    }
                    {...getFieldProps("password", {
                      rules: [
                        { required: true },
                        {
                          validator: checkPassword.bind(
                            this,
                            getFieldValue("password")
                          ),
                        },
                      ],
                      initialValue: "",
                    })}
                  />
                </Boxed>
                <Boxed margin="20px 0">
                  <Input
                    type="password"
                    placeholder="Confirm Password..."
                    onKeyPress={onEnter}
                    error={
                      getFieldError("confirmPassword")
                        ? "Confirm password must match password"
                        : null
                    }
                    {...getFieldProps("confirmPassword", {
                      rules: [
                        { required: true },
                        {
                          validator: checkConfirmPassword.bind(
                            this,
                            getFieldValue("password")
                          ),
                        },
                      ],
                      initialValue: "",
                    })}
                  />
                </Boxed>

                <Button
                  progress={loadingBtn}
                  diabled={loadingBtn}
                  onClick={onResetPassword}
                >
                  Reset Password
                </Button>

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
