import React, { useEffect, useState } from "react";
import moment from "moment";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input, AsyncSelect } from "../../components/Input.components";
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
import ApplicationFormModal from './ApplicationForm/index';

const appraisalOptions = [
  { value: 1, label: "Appraised" },
  { value: 0, label: "Not Appraised" },
];

const allocatedOptions = [
  { value: 1, label: "Allocated" },
  { value: 0, label: "Not Allocated" },
];

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
    applicationFormModal,
    accessList,
    profile,
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
    openApplicationFormModal,
  } = props;

  useEffect(() => {
    if (profile?.isProprietor || accessList["VIEW_PLOT"]) {
      let data = { size: 10, page: 1 };
      getAllParcels(data);
    } else {
      redirect("/dashboard");
    }
  }, []);

  const [appraisalStatus, setAppraisalStatus] = useState(null);
  const [allocatedStatus, setAllocatedStatus] = useState(null);

  let viewMode = calcViewMode();

  const DropDownMenu = (props) => {
    const { record } = props;
    return (
      <StyledDrpDown>
        {profile?.isProprietor ? ( // Menu for a plot owner
          <Dropdown>
            <Dropdown.Toggle variant id="dropdown-basic">
              <Icon className="icon-more-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  redirect(`/parcels/detail/${record.ParcelNumber}`)
                }
              >
                View Detail
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  redirect(`/parcels/view`, `?parcel=${record.FID}`)
                }
              >
                View Plot
              </Dropdown.Item>
              <Dropdown.Item onClick={() => rentParcel(record)}>
                Rent Plot
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          // Menu for a system admin
          <Dropdown>
            <Dropdown.Toggle variant id="dropdown-basic">
              <Icon className="icon-more-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  redirect(`/parcels/detail/${record.ParcelNumber}`)
                }
              >
                View Detail
              </Dropdown.Item>
              {accessList["VIEW_PLOT_MAP"] && (
                <Dropdown.Item
                  onClick={() =>
                    redirect(`/parcels/view`, `?parcel=${record.FID}`)
                  }
                >
                  View Plot
                </Dropdown.Item>
              )}
              {accessList["VIEW_PLOT_TDP"] && record.ALLOCATED === 1 && (
                <Dropdown.Item
                  onClick={() => redirect(`parcels/tdp/${record.ParcelNumber}`)}
                >
                  View TDP
                </Dropdown.Item>
              )}
              {accessList["CREATE_APPRAISAL"] && (
                <Dropdown.Item onClick={() => appraisalParcel(record)}>
                  Appraise Plot
                </Dropdown.Item>
              )}
              {accessList["VIEW_PARCEL_RENT"] && (
                <Dropdown.Item onClick={() => rentParcel(record)}>
                  Rent Plot
                </Dropdown.Item>
              )}
              {accessList["CREATE_ENCUMBRANCE"] && (
                <Dropdown.Item onClick={() => openEncumbranceModal(record)}>
                  Create Defect
                </Dropdown.Item>
              )}
              {accessList["CREATE_RECTIFICATION"] && (
                <Dropdown.Item onClick={() => openRectificationModal(record)}>
                  Create Rectification
                </Dropdown.Item>
              )}
              {accessList["VIEW_PLOT_MAP"] && record.ALLOCATED === 1 && (
                <Dropdown.Item
                  onClick={() =>
                    redirect(`deeds/application/${record.ParcelNumber}`)
                  }
                >
                  Create Deed Request
                </Dropdown.Item>
              )}
              {accessList["VIEW_PARCEL_WORK_QUERIES"] && (
                <Dropdown.Item>Work Queries</Dropdown.Item>
              )}
              {accessList["VIEW_PLOT_TDP"] && record.ALLOCATED === 1 && (
                <Dropdown.Item
                  onClick={() =>
                    redirect(`/parcels/cofo/${record.ParcelNumber}`)
                  }
                >
                  Generate COFO
                </Dropdown.Item>
              )}
              {record.ALLOCATED === 1 && (<Dropdown.Item onClick={() => openApplicationFormModal(record)}>
                Other Applications
              </Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
        )}
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
      title: "Area",
      dataIndex: "Shape__Area",
      key: "Shape__Area",
      align: "right",
      render: (text) =>
        text && `${formatCurrency(Math.round(text * 100) / 100)} sqt meter`,
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

  let externalParams = {
    appraised: appraisalStatus?.value,
    allocated: allocatedStatus?.value,
  };

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
            externalParams={externalParams}
            render={({
              changePageSize,
              handlePagination,
              currentPage,
              pageSize,
              search,
            }) => {
              return (
                <>
                  <Grid
                    desktop="repeat(5, 1fr)"
                    tablet="repeat(4, 1fr)"
                    mobile="repeat(1, 1fr)"
                  >
                    <Boxed pad="5px 0" margin="auto 0 0 0">
                      <Input
                        type="search"
                        placeholder="Search by plot number"
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    {!profile?.isProprietor && (
                      <>
                        <Boxed margin="auto 0 0 0">
                          <AsyncSelect
                            label="Appraisal Status"
                            isClearable={true}
                            options={appraisalOptions}
                            onChange={(value) => setAppraisalStatus(value)}
                          />
                        </Boxed>
                        <Boxed margin="auto 0 0 0">
                          <AsyncSelect
                            label="Allocated Status"
                            isClearable={true}
                            options={allocatedOptions}
                            onChange={(value) => setAllocatedStatus(value)}
                          />
                        </Boxed>
                      </>
                    )}
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
      {applicationFormModal && <ApplicationFormModal />}
    </>
  );
};
