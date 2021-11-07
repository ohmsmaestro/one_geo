import React from "react";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Text } from "../../components/Text.components";

import { calcViewMode } from "../../utils/utils";
import LOGIN_BG from "../../assets/img/gis-landing.png";
import LOGO from "../../assets/img/logo.png";

import { Theme } from "../../utils/theme";

import Step1 from "./Step1/index";
import Step2 from "./Step2/index";

export const SignUp = (props) => {
  // state props
  const { regForm, regStep } = props;

  // dispatch props
  const { redirect } = props;
  let viewMode = calcViewMode();

  return (
    <>
      <Grid desktop="55% 45%" tablet="55% 45%" mobile="100%">
        <Boxed display="flex" width="100%" minHeight="100vh">
          <Boxed margin="auto" pad="20px">
            <Boxed pad="10px 0">
              <img src={LOGO} height="50px" alt="app_logo" />
            </Boxed>
            <Text fontSize="24px" fontWeight="bold" margin="5px 0">
              Hello, nice to have you
            </Text>
            <Text margin="5px 0">
              Fill the form below to start your account creation.
            </Text>

            {regStep === 1 && <Step1 />}
            {regStep === 2 && <Step2 />}
            <Boxed pad="20px 0 0 0">
              <Text>
                Already have an account?{" "}
                <span
                  style={{ cursor: "pointer", color: Theme.PrimaryColor }}
                  onClick={() => redirect("/")}
                >
                  Sign In
                </span>
              </Text>
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
