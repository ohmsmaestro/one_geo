import React, { useEffect } from 'react';
import moment from 'moment';

import Wrapper from '../Common/FilterWrapper/index';

import { Grid } from '../../components/Grid.components';
import { Boxed } from '../../components/Boxed.components';
import { PageTitle, DropDownMenu } from '../../components/style';
import { Input } from '../../components/Input.components';
import { Loader } from '../../components/Loader.components';
import { Text } from '../../components/Text.components';
import { Badge } from '../../components/Badge.components';
import { Theme } from '../../utils/theme';
import { formatCurrency } from '../../utils/utils';
import { EmptyState } from '../../components/EmptyState.components';
import { TableComponent, PaginationComponent } from '../../components/Table.components';
import { Button } from '../../components/Button.components';

// import RectificationModal from '../Parcels/RectificationModal/index';
// import AppraisalModal from '../Parcels/Appraisal/index';
import EncumbranceModal from '../Parcels/EncumbranceModal/index';
// import ApplicationFormModal from '../Parcels/ApplicationForm/index';
import SubsequentTransModal from './SubsequentTransModal';

export const Lands = (props) => {
  // state props
  const {
    landsList,
    landsTotal,
    fetchActionURL,
    accessList,
    profile,
    encumbranceModal,
    subsequentTransModal
  } = props;

  // dispatch props
  const {
    isLoading,
    getAllLands,
    redirect,
    openEncumbranceModal,
    openSubsequentTransModal,
    openLandDetail,
    openEditDetail,
  } = props;

  useEffect(() => {
    if (profile?.isProprietor || accessList['VIEW_PLOT']) {
      let data = { size: 10, page: 1 };
      getAllLands(data);
    } else {
      redirect('/dashboard');
    }
  }, []);

  const dropDownMenu = [
    { key: 1, label: `View Details` },
    { key: 1.5, label: `View GIS` },
    // { key: 2, label: `Edit Details` },
    { key: 3, label: `View TDP` },
    { key: 4, label: `Generate ROFO` },
    { key: 5, label: `Generate COFO` },
    // { key: 5, label: `Appraise Plot` },
    { key: 6, label: `Create Title Defect` },
    { key: 7, label: `Create Subsequent Trans` },
    // { key: 8, label: `Other Applications` }
  ];

  const handleDropDownMenuAction = (item, record) => {
    switch (item.key) {
      case 1: // View land Details
        openLandDetail(record);
        break;
      case 1.5: // View land GIS
        redirect(`/parcels/view`, `?parcel=${record.parcelNumber}`);
        break;
      case 2: // Edit land Details
        openEditDetail(record);
        break;
      case 3: // View TDP
        redirect(`parcels/tdp/${record.parcelNumber}`);
        break;
      case 4: // View ROFO
        redirect(`/parcels/rofo/${record.parcelNumber}`)
        break;
      case 5: // View COFO
        redirect(`/parcels/cofo/${record.parcelNumber}`)
        break;
      case 6: // Open Encumbrance Modal
        openEncumbranceModal(record);
        break;
      case 7: // Create Subsequent Transaction
        openSubsequentTransModal(record);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Plot Number',
      dataIndex: 'parcelNumber',
      key: 'parcelNumber'
    },
    {
      title: 'Reg. Number',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
      render: (text, row) => {
        return (
          <>
            <Text color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize}>
              {text}
            </Text>
            <Text color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize}>
              {row?.regDate ? moment(row?.regDate).format('ll') : '--'}
            </Text>
          </>
        );
      }
    },

    {
      title: 'Type',
      dataIndex: 'landType',
      key: 'landType',
      render: (text, row) => {
        return (
          <>
            <Text color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize}>
              Type: {text}
            </Text>
            <Text color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize}>
              Use: {row.landUse ?? '--'}
            </Text>
          </>
        );
      }
    },
    {
      title: 'Area',
      dataIndex: 'landSize',
      key: 'landSize',
      align: 'right',
      render: (text) => text && `${formatCurrency(Math.round(text * 100) / 100)} sqt meter`
    },
    {
      title: 'Cert. No.',
      dataIndex: 'rofoNumber',
      key: 'rofoNumber',
      render: (text, row) => {
        return (
          <>
            <Text color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize}>
              ROFO: {text ? text : '--'}
            </Text>
            <Text color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize}>
              COFO: {row?.cofoNumber ? row?.cofoNumber : '--'}
            </Text>
          </>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      render: (text, row) => {
        return (
          <>
            {/* <Badge
              color={row.appraised === 1 ? Theme.PrimaryGreen : Theme.PrimaryYellow}
              fontSize={Theme.SecondaryFontSize}
            >
              {row.appraised === 1 ? 'APPRAISED' : 'NOT APPRAISED'}
            </Badge> */}
            <Badge
              color={row.assigned ? Theme.PrimaryGreen : Theme.PrimaryYellow}
              fontSize={Theme.SecondaryFontSize}
            >
              {row.assigned ? 'ALLOCATED' : 'NOT ALLOCATED'}
            </Badge>
          </>
        );
      }
    },
    {
      title: 'Last Payment',
      dataIndex: 'lastPaymentDate',
      key: 'lastPaymentDate',
      align: 'right',
      render: (text) => text && moment(text).format('ll')
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      align: 'right',
      render: (text, record) => {
        const newList = dropDownMenu.filter((item) => {
          if (!record.assigned && (item.key === 3 || item.key === 4 || item.key === 5 || item.key === 6 || item.key === 7)) {
            return false;
          }
          return true;
        });
        return (
          <DropDownMenu list={newList} handleAction={(e) => handleDropDownMenuAction(e, record)} />
        );
      }
    }
  ];
  const externalParams = {};

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Lands</PageTitle>

        <Boxed pad="20px 10px" background={Theme.TertiaryDark} borderRadius={Theme.SecondaryRadius}>
          <Wrapper
            externalActionURL={fetchActionURL}
            externalParams={externalParams}
            render={({
              changePageSize,
              handlePagination,
              currentPage,
              pageSize,
              search,
              pageOptions
            }) => {
              return (
                <>
                  <Grid desktop="repeat(4, 1fr)" tablet="repeat(4, 1fr)" mobile="repeat(1, 1fr)">
                    <Boxed pad="5px 0" margin="auto 0 0 0">
                      <Input
                        type="search"
                        placeholder="Search by plot number"
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    <Boxed />
                    <Boxed />
                    <Boxed pad="5px 0" align="right">
                      <Button onClick={() => redirect('/lands/create')}>Add Land</Button>
                    </Boxed>
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {' '}
                      {landsTotal > 0 ? (
                        <>
                          <TableComponent columns={columns} data={landsList} />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={landsTotal}
                              onChange={(page) => handlePagination(page, fetchActionURL)}
                              current={currentPage}
                              pageCounts={pageOptions}
                              changePageSize={(pageSize) =>
                                changePageSize(pageSize, fetchActionURL)
                              }
                              pageSize={pageSize}
                              itemsDisplayed
                              showTotal={(total, range) => {
                                return `${range[0]} - ${range[1]} of ${landsTotal} items`;
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
      {encumbranceModal && <EncumbranceModal />}
      {subsequentTransModal && <SubsequentTransModal />}
    </>
  );
};
