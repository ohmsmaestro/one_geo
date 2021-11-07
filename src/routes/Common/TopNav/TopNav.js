import React, { useState, useEffect } from 'react';
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Button } from "../../../components/Button.components";

import { calcViewMode } from "../../../utils/utils";

import LOGO_FULL from "../../../assets/img/aaer-logo.png";
import { HeaderNav, MobileIcon, NavMenu } from "../../style";
import { Hamburger } from "../../../assets/svg/hamburger.js";
import { Times } from "../../../assets/svg/times.js";

export const TopNav = (props) => {
  const { redirect } = props;
  const viewMode = calcViewMode();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <Boxed>
        <Grid
          desktop="repeat(3, 1fr)"
          tablet="repeat(3, 1fr)"
          mobile="120px auto"
          pad="10px 30px 10px 30px"
        >
          <Boxed>
            <img src={LOGO_FULL} alt="app_logo" height="40px" />
          </Boxed>

          {/* {viewMode !== "mobile" && ( */}
          <NavMenu onClick={handleClick} click={click}>
            <Boxed display="flex" align="center">
              <HeaderNav>
                <li onClick={() => redirect("/")}>Home</li>
                <li onClick={() => redirect("/features")}>Features</li>
                <li onClick={() => redirect("/pricing")}>Pricing</li>
              </HeaderNav>
            </Boxed>
          </NavMenu>
          {/* )} */}
          <Boxed align="right">
            {viewMode !== "mobile" && (
              <Button
                margin="5px 0"
                pale
                onClick={() => redirect("/registration")}
              >
                Register
              </Button>)}
            <Button margin="5px 15%" onClick={() => redirect("/login")}>
              Login
            </Button>
            
              <MobileIcon onClick={handleClick} align="right">
                {click ? <Times /> : <Hamburger />}
              </MobileIcon>
            
          </Boxed>
        </Grid>
      </Boxed>
    </>
  );
};
