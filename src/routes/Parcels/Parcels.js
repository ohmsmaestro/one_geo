import React, { useEffect } from "react";
import moment from "moment";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input } from "../../components/Input.components";
import { Button } from "../../components/Button.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";

import {
  TableComponent,
  PaginationComponent,
} from "../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode, formatCurrency } from "../../utils/utils";
import { pageOptions } from "../../utils/constant";
import { Theme } from "../../utils/theme";

import RentModal from "./Rent/index";
import AppraisalModal from "./Appraisal/index";
import EncumbranceModal from "./EncumbranceModal/index";
import Rectification from "./RectificationModal/index";

export const Parcels = (props) => {
  // state props
  const {
    parcelsList,
    parcelsTotal,
    rentModal,
    appraisalModal,
    fetchActionURL,
    encumbranceModal,
    rectificationModal,
    accessList,
  } = props;

  // dispatch props
  const {
    isLoading,
    getAllParcels,
    rentParcel,
    appraisalParcel,
    redirect,
    viewTDP,
    openEncumbranceModal,
    openRectificationModal,
  } = props;

  useEffect(() => {
    if (accessList["VIEW_PARCEL"]) {
      let data = {};
      getAllParcels(data);
    } else {
      redirect("/dashboard");
    }
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
            <Dropdown.Item
              onClick={() => redirect(`/parcels/detail/${record.ParcelNumber}`)}
            >
              View Detail
            </Dropdown.Item>
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item
                onClick={() =>
                  redirect(`/parcels/view`, `?parcel=${record.FID}`)
                }
              >
                View Plot
              </Dropdown.Item>
            )}
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item onClick={() => viewTDP(record)}>
                View TDP
              </Dropdown.Item>
            )}
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item onClick={() => appraisalParcel(record)}>
                Appraise Plot
              </Dropdown.Item>
            )}
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item onClick={() => rentParcel(record)}>
                Rent Plot
              </Dropdown.Item>
            )}
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item onClick={() => openEncumbranceModal(record)}>
                Create Encumbrance
              </Dropdown.Item>
            )}
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item onClick={() => openRectificationModal(record)}>
                Create Rectification
              </Dropdown.Item>
            )}
            {accessList["VIEW_PARCEL"] && (
              <Dropdown.Item>Work Queries</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "Plot Number",
      dataIndex: "ParcelNumber",
      key: "ParcelNumber",
    },
    {
      title: "Reg. Number",
      dataIndex: "REG_NUMBER",
      key: "REG_NUMBER",
    },
    {
      title: "Reg. Date",
      dataIndex: "REG_DATE",
      key: "REG_DATE",
      render: (text) => text && moment(text).format("ll"),
    },
    {
      title: "Land Type",
      dataIndex: "LAND_TYPE",
      key: "LAND_TYPE",
    },
    {
      title: "Land Use",
      dataIndex: "LAND_USE",
      key: "LAND_USE",
    },
    {
      title: "Cal. Area",
      dataIndex: "CALCULATED",
      key: "CALCULATED",
      align: "right",
      render: (text) => text && `${formatCurrency(text)} sqt meter`,
    },
    {
      title: "Date Created",
      dataIndex: "CreationDate",
      key: "CreationDate",
      align: "right",
      render: (text) => text && moment(text).format("ll"),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (text, record) => <DropDownMenu record={record} />,
    },
  ];

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Plot</PageTitle>
        <Boxed
          pad="20px 10px"
          background={Theme.TertiaryDark}
          borderRadius={Theme.SecondaryRadius}
        >
          <Wrapper
            externalActionURL={fetchActionURL}
            render={({
              changePageSize,
              handlePagination,
              currentPage,
              pageSize,
            }) => {
              return (
                <>
                  <Grid
                    desktop="repeat(4, 1fr)"
                    tablet="repeat(4, 1fr)"
                    mobile="repeat(1, 1fr)"
                  >
                    <Boxed pad="5px 0">
                      <Input
                        type="search"
                        placeholder="Search by parcel number"
                      />
                    </Boxed>
                    <Boxed />
                    <Boxed />
                    <Boxed />
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {" "}
                      {parcelsTotal > 0 ? (
                        <>
                          <TableComponent
                            columns={columns}
                            data={parcelsList}
                          />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={parcelsTotal}
                              onChange={(page) =>
                                handlePagination(page, fetchActionURL)
                              }
                              current={currentPage}
                              pageCounts={pageOptions}
                              changePageSize={(pageSize) =>
                                changePageSize(pageSize, fetchActionURL)
                              }
                              pageSize={pageSize}
                              itemsDisplayed
                              showTotal={(total, range) => {
                                return `${range[0]} - ${range[1]} of ${parcelsTotal} items`;
                              }}
                            />
                          </Boxed>
                        </>
                      ) : (
                        <EmptyState />
                      )}
                    </>
                  )}
                </>
              );
            }}
          />
        </Boxed>
      </Boxed>

      {rentModal && <RentModal />}
      {appraisalModal && <AppraisalModal />}
      {encumbranceModal && <EncumbranceModal />}
      {rectificationModal && <Rectification />}
    </>
  );
};
