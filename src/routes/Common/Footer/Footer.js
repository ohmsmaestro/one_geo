import React from "react";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";

import { calcViewMode } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";

import LOGO_FULL from "../../../assets/img/logo-full.png";

import { FooterNav } from "../../style";

export const Footer = (props) => {
  const { redirect } = props;
  return (
    <>
      <Boxed
        width="100%"
        pad="1rem 0"
        height="100%"
        display="flex"
        position="relative"
        background={`${Theme.SecondaryDark}50`}
      >
        <Boxed maxWidth="1080px" width="100%" margin="0 auto" pad="1rem 10px">
          <Grid
            desktop="repeat(4, 1fr)"
            tablet="repeat(4, 1fr)"
            mobile="repeat(2, 1fr)"
          >
            <Boxed>
              <img
                src={LOGO_FULL}
                height="60px"
                onClick={() => redirect("/")}
                alt="logo_img"
              />
            </Boxed>
            <Boxed>
              <FooterNav>
                <li className="title"> PRODUCTS</li>
                <li onClick={() => redirect("/features")}>Features</li>
                <li onClick={() => redirect("/pricing")}>Pricing</li>
                <li>Whats New</li>
                <li>FAQs & Support</li>
              </FooterNav>
            </Boxed>
            <Boxed>
              <FooterNav>
                <li className="title"> COMPANY</li>
                <li>About Us</li>
                <li>Career</li>
                <li>Blog</li>
              </FooterNav>
            </Boxed>
            <Boxed>
              <FooterNav>
                <li className="title"> LEGAL</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </FooterNav>
            </Boxed>
          </Grid>
        </Boxed>
      </Boxed>
    </>
  );
};
