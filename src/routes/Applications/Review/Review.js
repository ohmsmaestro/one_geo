import React, { useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Input } from "../../../components/Input.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Loader } from "../../../components/Loader.components";
import { Avatar } from "../../../components/Avatar.components";
import { FileComponent } from "../../../components/File.components";
import { PageTitle, Icon, StyledDrpDown, HR } from "../../../components/style";

import { calcViewMode, formatDate } from "../../../utils/utils";
import { pageOptions } from "../../../utils/constant";
import { Theme } from "../../../utils/theme";

import MALE_IMG from "../../../assets/img/male.png";

export const Review = (props) => {
  // state props
  const { isLoading, applicationDetail, params } = props;
  const { files } = applicationDetail;

  // dispatch props
  const { redirect, getApplicationDetail } = props;

  useEffect(() => {
    let data = {
      id: params.id,
    };
    getApplicationDetail(data);
  }, []);

  let viewMode = calcViewMode();

  const DropDownMenu = (props) => {
    const { record } = props;
    return (
      <StyledDrpDown>
        <Dropdown>
          <Dropdown.Toggle variant id="dropdown-basic">
            <Icon className="icon-more-vertical" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Review</Dropdown.Item>
            <Dropdown.Item>Allocate Parcel</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>
          {" "}
          <span
            onClick={() => redirect("/application")}
            style={{ cursor: "pointer", fontWeight: 300 }}
          >
            Applications
          </span>{" "}
          / Application Review
        </PageTitle>

        {isLoading ? (
          <Boxed pad="20px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <Boxed>
            <Boxed pad="10px 0" align="right">
              <Button pale>Decline</Button>
              <Button>Approve</Button>
              <Button color={Theme.PrimaryBlue}>Allocate Parcel</Button>
            </Boxed>

            <Grid
              desktop="120px auto"
              tablet="120px auto"
              mobile="repeat(1, 1fr)"
            >
              <Boxed>
                <Avatar src={MALE_IMG} size="110px" />
              </Boxed>
              <Grid
                desktop="repeat(3,1fr)"
                tablet="repeat=(3,1fr)"
                mobile="repeat(2, 1fr)"
              >
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Last Name
                  </Text>
                  <Text padding="0 5px">{applicationDetail.last_name}</Text>
                </Boxed>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    First Name
                  </Text>
                  <Text padding="0 5px">{applicationDetail.first_name}</Text>
                </Boxed>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Middle Name
                  </Text>
                  <Text padding="0 5px">{applicationDetail.middle_name}</Text>
                </Boxed>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    State of Origin
                  </Text>
                  <Text padding="0 5px">{applicationDetail?.state?.name}</Text>
                </Boxed>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Local Gov. Area
                  </Text>
                  <Text padding="0 5px">{applicationDetail?.lga?.name}</Text>
                </Boxed>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Identification
                  </Text>
                  <Text padding="0 5px">
                    {applicationDetail?.identification}
                  </Text>
                </Boxed>
              </Grid>
            </Grid>
            <HR />
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Scanned File(s)
            </Text>
            <Boxed>
              <Grid
                desktop="repeat(5, 1fr)"
                tablet="repeat(4, 1fr)"
                mobile="repeat(2, 1fr)"
              >
                {files &&
                  files.map((item, index) => {
                    return (
                      <Boxed pad="10px" key={index}>
                        <FileComponent {...item} />
                      </Boxed>
                    );
                  })}
              </Grid>
            </Boxed>
          </Boxed>
        )}
      </Boxed>
    </>
  );
};
