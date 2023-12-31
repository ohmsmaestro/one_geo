import React, { useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import Wrapper from '../Common/FilterWrapper/index';

import { Grid } from '../../components/Grid.components';
import { Boxed } from '../../components/Boxed.components';
import { Input } from '../../components/Input.components';
import { Loader } from '../../components/Loader.components';
import { Text } from '../../components/Text.components';
import { EmptyState } from '../../components/EmptyState.components';
import { TableComponent, PaginationComponent } from '../../components/Table.components';
import { PageTitle, Icon, StyledDrpDown } from '../../components/style';

import { calcViewMode, formatDate } from '../../utils/utils';
import { pageOptions } from '../../utils/constant';
import { Theme } from '../../utils/theme';

export const SubsequentTrans = (props) => {
    // state props
    const { isLoading, subsequentTransList, subsequentTransTotal, fetchActionURL } = props;

    // dispatch props
    const { redirect, getAllSubsequentTrans } = props;

    useEffect(() => {
        let data = {
            page: 1,
            size: 10
        };
        getAllSubsequentTrans(data);
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
                        <Dropdown.Item onClick={() => redirect(`/users/${record.userId}`)}>
                            View Owner
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </StyledDrpDown>
        );
    };

    const columns = [
        {
            title: 'Entry Number',
            dataIndex: 'applicationId',
            key: 'applicationId'
        },
        {
            title: 'Plot No.',
            dataIndex: 'plotNumber',
            key: 'plotNumber'
        },
        {
            title: 'Owner',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) =>
                text && (
                    <Text
                        fontSize={Theme.SecondaryFontSize}
                        cursor="pointer"
                        onClick={() => redirect(`/users/${record.userId}`)}
                    >
                        {text}
                    </Text>
                )
        },

        {
            title: 'Entry. Date',
            dataIndex: 'entryDate',
            key: 'entryDate',
            render: (text) => text && formatDate(text)
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            render: (text, record) => <DropDownMenu record={record} />
        }
    ];

    console.log({ subsequentTransList })

    return (
        <>
            <Boxed pad="20px">
                <PageTitle>Subsequent Transactions</PageTitle>
                <Boxed pad="20px 10px" background={Theme.TertiaryDark} borderRadius={Theme.SecondaryRadius}>
                    <Wrapper
                        externalActionURL={fetchActionURL}
                        render={({ changePageSize, handlePagination, currentPage, pageSize, search }) => {
                            return (
                                <>
                                    <Grid desktop="repeat(4, 1fr)" tablet="repeat(4, 1fr)" mobile="repeat(1, 1fr)">
                                        <Boxed pad="5px 0">
                                            <Input
                                                type="search"
                                                placeholder="Search by entry number"
                                                onChange={(value) => search(value, fetchActionURL)}
                                            />
                                        </Boxed>
                                        <Boxed />
                                        <Boxed />
                                    </Grid>
                                    {isLoading ? (
                                        <Boxed display="flex" pad="20px">
                                            <Loader margin="auto" />
                                        </Boxed>
                                    ) : (
                                        <>
                                            {' '}
                                            {subsequentTransTotal > 0 ? (
                                                <>
                                                    <TableComponent columns={columns} data={subsequentTransList} />
                                                    <Boxed pad="10px 0 ">
                                                        <PaginationComponent
                                                            total={subsequentTransTotal}
                                                            onChange={(page) => handlePagination(page, fetchActionURL)}
                                                            current={currentPage}
                                                            pageCounts={pageOptions}
                                                            changePageSize={(pageSize) =>
                                                                changePageSize(pageSize, fetchActionURL)
                                                            }
                                                            pageSize={pageSize}
                                                            itemsDisplayed
                                                            showTotal={(total, range) => {
                                                                return `${range[0]} - ${range[1]} of ${subsequentTransTotal} items`;
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
