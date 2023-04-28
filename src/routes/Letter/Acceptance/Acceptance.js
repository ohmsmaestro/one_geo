import React, { useEffect } from 'react';
import moment from 'moment';

import { Grid } from '../../../components/Grid.components';
import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { Button } from '../../../components/Button.components';
import { Loader } from '../../../components/Loader.components';
import { HR, PageTitle } from '../../../components/style';

import { Theme } from '../../../utils/theme';
import { formatCurrency } from '../../../utils/utils';

import LOGO from '../../../assets/img/logo.png';

export const AcceptanceLetter = (props) => {
  // state props received
  const { isLoading, applicationDetail, params, landData } = props;

  // dispatch props received
  const { redirect, getApplicationDetail } = props;

  useEffect(() => {
    params?.applicationNumber && getApplicationDetail({ id: params.applicationNumber });
  }, []);

  const fullName =
    applicationDetail.ownershipType === 'PRIVATE'
      ? `${applicationDetail.lastname} ${applicationDetail?.middlename} ${applicationDetail.firstname}`
      : applicationDetail.name;

  return (
    <Boxed pad="10px 20px">
      <PageTitle className="no-print">
        <span
          onClick={() => redirect('/application')}
          style={{ cursor: 'pointer', fontWeight: 300 }}
        >
          Applications
        </span>{' '}
        <span style={{ fontWeight: 300 }}>/ Acceptance Letter /</span> {params?.applicationNumber}
      </PageTitle>
      <Boxed align="right" pad="15px 0" className="no-print">
        <Button clear color={Theme.SecondaryTextColor} onClick={() => redirect('/application')}>
          Back
        </Button>{' '}
        <Button onClick={() => window.print()}>Print</Button>
      </Boxed>
      <Boxed display="flex">
        {isLoading ? (
          <Loader margin="auto" />
        ) : (
          <Boxed pad="20px" background="#FFFFFF" maxWidth="800px" width="100%" margin="0 auto">
            <Boxed display="flex" pad="10px">
              <img src={LOGO} height="120px" style={{ margin: 'auto' }} alt="app logo" />
            </Boxed>
            <Grid desktop="repeat(3, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(3,1fr)">
              <div />
              <div />
              <Text>Date: {moment().format('ll')}</Text>
              <Text>
                Name: {fullName} <br />
                Address: {applicationDetail.residentialAddress} <br />
                File Number: Unknown <br />
                Dear Sir/Ma,
              </Text>
            </Grid>
            <Text padding="20px 10px" align="center" fontSize="22px" fontWeight="600">
              Acceptance Letter
            </Text>
            <Text pad="10px">
              With reference to your application for a Certificate of Occupancy over a piece of Land
              at <b>{landData?.legalDescription}</b>, I wish to inform you that your application has been considered.
              Before then, you are required to settle the Final Deed Fees as attached in the Bill.
              Upon payment of all fees indicated in the Bill, Certificate of Occupancy will be
              prepared for you immediately with below details: <br />
              <ul>
                <li>Name of the Owner: {fullName}</li>
                <li>Owner’s Address: {applicationDetail?.residentialAddress}</li>
                <li>Land description: {landData?.legalDescription}</li>
                <li>Land size: {landData?.landSize ? formatCurrency(landData?.landSize) : 0} square meter </li>
                <li>Land Use: {landData?.landUse}</li>
              </ul>
              Please ensure that all fees are paid within 7 days of receiving this letter to enable us prepare your Certificate of Occupancy or else, your application will be closed.
              <br />
              Thanks
            </Text>
            <Text
              margin="40px 0 10px 0"
              padding="5px 0"
              style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}`, display: 'inline-block' }}
              fontWeight="600"
              fontSize={Theme.SecondaryFontSize}
            >
              Head, Customer Service Centre (YOGIS)
            </Text>
            <HR />
            <Text padding="20px 10px" align="center" fontSize="16px" fontWeight="600">
              ACCEPTANCE of C of O Printout
            </Text>
            <Text pad="10px">
              I have accepted the intent over piece of land at <b>{landData?.legalDescription}</b> as stipulated above.
            </Text>
            <Text
              margin="20px 0 10px 0"
              padding="5px 0"
              style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}`, display: 'inline-block' }}
              fontWeight="600"
              fontSize={Theme.SecondaryFontSize}
            >
              Signature and Date of Acceptance
            </Text>
          </Boxed>
        )}
      </Boxed>
    </Boxed>
  );
};
