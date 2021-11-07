import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import { Label, Input } from "../../../components/Input.components";
import { Button } from "../../../components/Button.components";
import { Text } from "../../../components/Text.components";
import { Boxed } from "../../../components/Boxed.components";
import { Avatar } from "../../../components/Avatar.components";
import { Icon, StyledDrpDown } from "../../../components/style";

import maleImage from "../../../assets/img/male.png";
import Logo from "../../../assets/img/logo.png";

import { calcViewMode } from "../../../utils/utils";
import { Grid } from "../../../components/Grid.components";
// import { Theme } from "../../../utils/theme";

export const HeaderLayout = (props) => {
  // state props
  const { profile, pageTitle, collaspe, nightMode } = props;

  // dispatch props
  const { redirect, logOut, setCollaspe, toggleNightMode } = props;

  const Theme = useContext(ThemeContext);

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  let genderImage = maleImage;

  let viewMode = calcViewMode();

  let navColor = Theme.SideBarColor;

  const onSubmitSearch = () => {
    if (search) {
      setShowSearch(false);
      redirect(`search`, `?search=${search}`);
    }
  };

  const onEnter = (e) => {
    e.stopPropagation();
    e.key === "Enter" && onSubmitSearch();
  };

  return (
    <Boxed
      style={{
        top: "0",
        zIndex: "300",
      }}
      width="inherit"
      position="fixed"
      height="59px"
      bColor={navColor}
    >
      <Container fluid>
        <Row>
          <Col
            className="px-0"
            lg={{ span: 4 }}
            md={{ span: 4 }}
            sm={{ span: 4 }}
            xs={{ span: 4 }}
          >
            <Boxed
              align={viewMode === "mobile" ? "left" : "center"}
              display="flex"
              height="100%"
            >
              {viewMode === "mobile" ? (
                <Boxed margin="auto" display="flex" pad="0 0.5rem">
                  <Boxed pad="0 1rem" display="flex">
                    <Icon
                      margin="auto 0"
                      color={Theme.SecondaryTextColor}
                      className="icon icon-menu"
                      onClick={() => setCollaspe(!collaspe)}
                    ></Icon>
                  </Boxed>

                  <img
                    src={Logo}
                    alt="logo"
                    height="40px"
                    onClick={() => redirect("/dashbaord")}
                  />
                </Boxed>
              ) : null}
              {pageTitle && (
                <Text margin="auto 5px" fontWeight="bold">
                  {pageTitle}
                </Text>
              )}
            </Boxed>
          </Col>

          <Col
            className="px-0"
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 8 }}
            xs={{ span: 8 }}
          >
            <Boxed className="px-1" align="right" display="flex">
              <Boxed display="flex" margin="0 0 0 auto" height="58px">
                <Boxed height="59px" display="flex">
                  <Icon
                    className="icon-search-1"
                    margin="auto 5px"
                    pad="5px"
                    cursor="pointer"
                    border={`1px solid ${Theme.SecondaryTextColor}`}
                    color={Theme.SecondaryTextColor}
                    borderRadius="50%"
                    onClick={() => setShowSearch((prev) => !prev)}
                  />
                  <Icon
                    className="icon-moon"
                    margin="auto 5px"
                    pad="5px"
                    cursor="pointer"
                    border={`1px solid ${Theme.SecondaryTextColor}`}
                    color={Theme.SecondaryTextColor}
                    borderRadius="50%"
                    onClick={() => toggleNightMode(!nightMode)}
                  />
                  <StyledDrpDown style={{ margin: "auto 0" }}>
                    <Dropdown>
                      <Dropdown.Toggle variant id="dropdown-basic">
                        <Label fontSize="13px" lineHeight="33px" pad="0">
                          <Avatar src={genderImage} size="35px" />{" "}
                          {/* {profile?.username} */}
                          <i
                            className="icon icon-angle-down"
                            fontSize="16px"
                            color={Theme.PrimaryTextColor}
                            pad="0.15rem 0.35rem"
                          />
                        </Label>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* <Dropdown.Item onClick={() => redirect("/profile")}>
                          View Profile
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={() => logOut(profile)}>
                          Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </StyledDrpDown>
                </Boxed>
              </Boxed>
            </Boxed>
          </Col>
        </Row>
        <Boxed display="relative">
          {showSearch && (
            <Boxed
              margin="5px auto"
              display="absolute"
              maxWidth="600px"
              pad="5px"
              borderRadius={Theme.SecondaryRadius}
              bColor={Theme.TertiaryDark}
              boxShadow={`0 0 4px 1px ${Theme.PrimaryTextColor}20`}
            >
              <Grid
                desktop="auto 100px"
                tablet="auto 100px"
                mobile="auto 100px"
              >
                <Input
                  type="text"
                  placeholder="Search cases"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={onEnter}
                  width="100%"
                />
                <Button onClick={() => onSubmitSearch()}> Search</Button>
              </Grid>
            </Boxed>
          )}
        </Boxed>
      </Container>
    </Boxed>
  );
};

HeaderLayout.propTypes = {};
