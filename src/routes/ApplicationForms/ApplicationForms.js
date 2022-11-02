import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { AsyncSelect, Input } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";
import { PaginationComponent } from "../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode, formatDate, truncateText } from "../../utils/utils";
import { pageOptions } from "../../utils/constant";
import { Theme } from "../../utils/theme";

const statusOptions = [
    { value: 1, label: "Open" },
    { value: 2, label: "In Progress" },
    { value: 3, label: "Closed" },
    { value: 4, label: "Rejected" },
];

const getStatus = (status, declined) => {
    if (declined) {
        return (
            <Text
                color={Theme.PrimaryRed}
                fontWeight="600"
                fontSize={Theme.SecondaryFontSize}
                align="center"
            >
                {" "}
                <Icon
                    className="icon-cancel-circled"
                    color={Theme.PrimaryRed}
                    margin="0 5px 0 0"
                    fontSize="16px"
                />{" "}
                Declined [{status}]
            </Text>
        );
    }
    switch (status) {
        case "IN_PROGRESS":
            return (
                <Text
                    color={Theme.PrimaryYellow}
                    fontSize={Theme.SecondaryFontSize}
                    align="center"
                >
                    {" "}
                    <Icon
                        className="icon-attention-1"
                        color={Theme.PrimaryYellow}
                        margin="0 5px 0 0"
                        fontSize="16px"
                    />{" "}
                    In Progress
                </Text>
            );

        case "OPEN":
            return (
                <Text
                    color={Theme.PrimaryBlue}
                    fontSize={Theme.SecondaryFontSize}
                    align="center"
                >
                    {" "}
                    <Icon
                        className="icon-attention-1"
                        color={Theme.PrimaryBlue}
                        margin="0 5px 0 0"
                        fontSize="16px"
                    />{" "}
                    Open
                </Text>
            );

        case "REJECTED":
            return (
                <Text
                    color={Theme.PrimaryRed}
                    fontWeight="600"
                    fontSize={Theme.SecondaryFontSize}
                    align="center"
                >
                    {" "}
                    <Icon
                        className="icon-cancel-circled"
                        color={Theme.PrimaryRed}
                        margin="0 5px 0 0"
                        fontSize="16px"
                    />{" "}
                    REJECTED
                </Text>
            );
        case "CLOSED":
            return (
                <Text
                    color={Theme.PrimaryGreen}
                    align="center"
                    fontSize={Theme.SecondaryFontSize}
                >
                    <Icon
                        className="icon-ok-circled-1"
                        color={Theme.PrimaryGreen}
                        margin="0 5px 0 0"
                        fontSize="16px"
                    />{" "}
                    Closed
                </Text>
            );
        default:
            return "-- / --";
    }
};

export const ApplicationForms = (props) => {
    // state props
    const {
        isLoading,
        applicationFormList,
        applicationFormTotal,
        fetchActionURL,
        isProprietor,
        applicationFormTypes,
    } = props;

    // dispatch props
    const { getAllApplicationForms, redirect, fetchApplicationFormTypes } = props;

    const [status, setStatus] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {
        let data = {
            page: 1,
            size: 10,
        };
        getAllApplicationForms(data);
        fetchApplicationFormTypes()
    }, []);

    const goToReview = (id) => {
        redirect(`/application/form/${id}`);
    };

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
                        <Dropdown.Item onClick={() => console.log({ id: record.id })}>
                            Review
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </StyledDrpDown>
        );
    };

    const ApplicationCard = ({ record }) => {
        const { id, name, plotNumber, remark,  } = record;
        return (
            <Boxed
                background={Theme.TertiaryDark}
                borderRadius={Theme.SecondaryRadius}
                pad="10px 0"
                boxShadow={Theme.PrimaryShadow}
                border={`0.5px solid ${Theme.PrimaryBorderColor}`}
                cursor="pointer"
            >
                <Text
                    padding="5px 5px"
                    fontSize={Theme.SecondaryFontSize}
                >
                    #{id}:{" "}
                    <b> {plotNumber}

                    </b>
                </Text>
                <Boxed pad="10px" background={Theme.PrimaryDark}>
                    <Grid desktop="auto 10px" tablet="auto 10px" mobile="auto 10px">
                        <Boxed>
                            {/* <Text fontWeight="600">{type}</Text> */}
                            <Text
                                fontSize={Theme.SecondaryFontSize}
                                color={Theme.SecondaryTextColor}
                                fontWeight="600"
                            >
                                {name}
                            </Text>
                        </Boxed>
                        <Boxed>
                            <DropDownMenu record={record} />
                        </Boxed>
                    </Grid>
                </Boxed>
                <Text
                    padding="5px 5px 5px 10px"
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                >
                    {remark && truncateText(remark, 50)}
                </Text>
                {/* <Boxed pad="5px 10px">{getStatus(status, declined)}</Boxed> */}
            </Boxed>
        );
    };

    let externalParams = { status: status?.value, type: type?.value };

    return (
        <>
            <Boxed pad="20px">
                <PageTitle>Application Form Requests</PageTitle>
                <Boxed
                    pad="20px 10px"
                    background={Theme.TertiaryDark}
                    borderRadius={Theme.SecondaryRadius}
                >
                    <Wrapper
                        externalParams={externalParams}
                        externalActionURL={fetchActionURL}
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
                                        desktop="repeat(4, 1fr)"
                                        tablet="repeat(4, 1fr)"
                                        mobile="repeat(1, 1fr)"
                                    >
                                        <Boxed pad="5px 0" margin="auto 0 0 0">
                                            <Input
                                                type="search"
                                                placeholder="Search by App. no."
                                                onChange={(value) => search(value, fetchActionURL)}
                                            />
                                        </Boxed>
                                        <Boxed pad="5px 0" margin="auto 0 0 0">
                                            <AsyncSelect
                                                label="Status"
                                                options={statusOptions}
                                                onChange={(value) => setStatus(value)}
                                            />
                                        </Boxed>
                                        <Boxed pad="5px 0" margin="auto 0 0 0">
                                            <AsyncSelect
                                                label="Type"
                                                options={applicationFormTypes}
                                                onChange={(value) => setType(value)}
                                            />
                                        </Boxed>
                                    </Grid>
                                    {isLoading ? (
                                        <Boxed display="flex" pad="20px">
                                            <Loader margin="auto" />
                                        </Boxed>
                                    ) : (
                                        <>
                                            {applicationFormTotal > 0 ? (
                                                <>
                                                    <Grid
                                                        desktop="repeat(4,1fr)"
                                                        tablet="repeat(4, 1fr)"
                                                        mobile="repeat(1,1fr)"
                                                        pad="10px 0"
                                                    >
                                                        {applicationFormList.map((item) => (
                                                            <Boxed pad="10px 0">
                                                                <ApplicationCard record={item} />
                                                            </Boxed>
                                                        ))}
                                                    </Grid>
                                                    <Boxed pad="10px 0 ">
                                                        <PaginationComponent
                                                            total={applicationFormTotal}
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
                                                                return `${range[0]} - ${range[1]} of ${applicationFormTotal} items`;
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
        </>
    );
};
