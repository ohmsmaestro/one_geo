import React, { useEffect } from 'react';
import moment from 'moment';

import { Grid } from '../../../components/Grid.components';
import { Text } from '../../../components/Text.components';
import { Boxed } from '../../../components/Boxed.components';
import { Button } from '../../../components/Button.components';
import { PDFReader } from '../../../components/Reader.component';
import { Loader } from '../../../components/Loader.components';
import { PageTitle } from '../../../components/style';

import { Theme } from '../../../utils/theme';

import ARROW_ICON from '../../../assets/img/north-arrow.png';

import { MAP_URL } from '../../../utils/config';
import { formatCurrency } from '../../../utils/utils';

export const TDP = (props) => {
  // state props received
  const { tdpData, params, showPrint, isLoading, landData, ownersDetail } = props;

  // dispatch props received
  const { redirect, fetchTDP, getSingleLand, getLandOwner } = props;

  useEffect(() => {
    console.log({ params });
    if (params?.ParcelNumber) {
      fetchTDP({ parcelNumber: params.ParcelNumber });
      getSingleLand({ search: params.ParcelNumber });
    }
  }, []);

  useEffect(() => {
    console.log(`land_Owner_1`, { landData })
    if (landData?.ownerId) {
      console.log(`land_Owner_2`, { landData })
      getLandOwner({ id: landData?.ownerId });
    }
  }, [landData?.ownerId]);

  const mapURL = `${MAP_URL}/map.html${landData ? `?tdp=${landData.parcelNumber}` : ''}`;

  let fullName = `${ownersDetail.firstname} ${ownersDetail.middlename} ${ownersDetail.lastname}`;

  console.log({ landData, ownersDetail })

  const RenderOldTDP = () => {
    return (
      <>
        <Text pad="10px" align="center" fontSize="22px" fontWeight="600">
          CERTIFICATE OF OCCUPANCY
        </Text>
        <Text pad="10px" align="center" fontSize="16px" fontWeight="600">
          {landData.parcelNumber}
        </Text>

        <Text padding="5px 0" align="center" fontSize="16px">
          Land Granted to:
          <br />
          <b>{fullName}</b>
          <br />
          {ownersDetail.residentialAddress}
          <br />
          <b>{ownersDetail.stateOfResidence}</b>
        </Text>
        <Boxed display="flex">
          <Text
            margin="40px auto 10px auto"
            align="center"
            style={{
              borderTop: `1px dashed ${Theme.PrimaryTextColor}`,
              width: '200px'
            }}
          >
            <b>SURVEYOR GENERAL</b>
            <br />
            {moment('24-08-2020').format('ll')}
          </Text>
        </Boxed>
        <Grid pad="20px" desktop="auto 40px" tablet="auto 40px" mobile="auto 40px">
          <iframe
            src={mapURL}
            width="100%"
            height="400px"
            style={{ width: '550px', margin: 'auto' }}
          ></iframe>
          <Boxed pad="10px 0">
            <img src={ARROW_ICON} width="38px" alt="north-arrow" />
          </Boxed>
        </Grid>

        <Grid pad="10px" desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(2, 1fr)">
          <Grid desktop="100px auto" tablet="100px auto" mobile="100px auto" gap="0">
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Origin
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {' '}
            </Text>

            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Coordinates
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {' '}
            </Text>

            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Surveyed By
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {landData.surveyedBy}
            </Text>

            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Date
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {landData?.regDate && moment(landData?.regDate).format('ll')}{' '}
            </Text>

            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Checked By
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {landData.checkedBy}
            </Text>

            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Drawn By
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {landData.drawnBy}
            </Text>

            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              Location
            </Text>
            <Text
              border={`1px solid ${Theme.PrimaryTextColor}`}
              fontWeight="600"
              padding="2px 5px"
              fontSize={Theme.SecondaryFontSize}
            >
              {landData.legalDescription}
            </Text>
          </Grid>
          <Boxed border={`1px solid ${Theme.PrimaryTextColor}`} pad="10px">
            <Text align="center" fontWeight="600" fontSize={Theme.SecondaryFontSize}>
              Schedule
            </Text>

            <Text fontSize={Theme.SecondaryFontSize}>
              All that piece of land, surveyed under Right of Occupancy no.{' '}
              <b>{landData.rofoNumber}</b> at <b>{landData.legalDescription}</b> Local Government Area of
              Yobe State, consisting of an area of{' '}
              <b>
                {landData.landSize &&
                  `${formatCurrency(Math.round(landData.landSize * 100) / 100)} square meter`}
              </b>
              . The boundaries of which are delineated on the plan over leaf{' '}
              <b>{landData.parcelNumber}</b>.
              <br />
              <b>"PLOT 27, YAKUBUN BAUCHI ROAD."</b> The boundary runs, starting from{' '}
              <b>"YB27166....."</b> thus, enclosing the area stated above. All corners are marked by
              concrete beacons and all bearings are referred to National Grid North.
            </Text>
          </Boxed>
        </Grid>
      </>
    );
  };

  return (
    <Boxed pad="10px 20px">
      {showPrint && (
        <>
          <Boxed className="no-print">
            <PageTitle>TDP / {params.ParcelNumber}</PageTitle>
          </Boxed>
          <Boxed align="right" pad="15px 0" className="no-print">
            <Button clear color={Theme.SecondaryTextColor} onClick={() => redirect('/lands')}>
              Back
            </Button>{' '}
            <Button onClick={() => window.print()}>Print</Button>
          </Boxed>
        </>
      )}
      <Boxed display="flex">
        {isLoading ? (
          <Loader margin="auto" />
        ) : (
          <Boxed pad="20px" background="#FFFFFF" maxWidth="800px" margin="0 auto" width="100%">
            {/* {tdpData?.file && <PDFReader document={{ base64: tdpData.file }} />} */}
            {<RenderOldTDP />}
          </Boxed>
        )}
      </Boxed>

    </Boxed>
  );
};
