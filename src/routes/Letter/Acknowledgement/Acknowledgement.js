import React, { useEffect } from 'react';
import moment from 'moment';

import { Grid } from '../../../components/Grid.components';
import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { Button } from '../../../components/Button.components';
import { Loader } from '../../../components/Loader.components';
import { PageTitle } from '../../../components/style';

import { Theme } from '../../../utils/theme';

import LOGO from '../../../assets/img/logo.png';

export const AcknowledgementLetter = (props) => {
  // state props received
  const { isLoading, applicationDetail, params } = props;

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
        <span style={{ fontWeight: 300 }}>/ Acknowledgement Letter /</span>{' '}
        {params?.applicationNumber}
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
              <Text>
                Yobe Geographic Information Service(YOGIS) <br />
                Ibrahim Babanginda <br />
                Secretariat <br />
                Damaturu, Yobe State.
                <br />
                Date:{' '}
                {applicationDetail?.createdAt && moment(applicationDetail.createdAt).format('ll')}
              </Text>
              <Text>
                Name: {fullName} <br />
                Address: {applicationDetail.residentialAddress} <br />
                Application Number: {applicationDetail.id}
              </Text>
            </Grid>
            <Text padding="20px 10px" align="center" fontSize="22px" fontWeight="600">
              Acknowledgement Letter
            </Text>
            <Text pad="10px">
              Your application for a Certificate of Occupancy dated{" "}
              <b>{applicationDetail?.createdAt && moment(applicationDetail.createdAt).format('ll')}</b>{" "}
              has been received by Yobe Geographic Information Service (YOGIS). This letter is to
              acknowledge that all the plot details below were carefully verified by you: <br />
              <ul>
                <li>Land Location</li>
                <li>Land Use</li>
                <li>Date of Allocation</li>
                <li>Allocation (Town/Layout)</li>
                <li>Approximate size of land</li>
              </ul>
              You can now logon and track your application at the Yobe Geographic Information
              Service(YOGIS) centre in Damaturu, Yobe State with your Application Number. Also, the
              under listed documents were received and verified by YOGIS: (The requirements as
              attached to this specific Application)
              <br />
              <ul>
                <li>Application Form</li>
                <li>Receipt(s)</li>
                <li>Two (2) Copies of Survey Plans (Original)</li>
                <li>Allocation Letter</li>
                <li>Two (2) Passport Photographs</li>
                <li>Tax Clearance</li>
                <li>Company Registration details (in case of company) & Seal</li>
              </ul>
              Your application is now being processed by Yobe Geographic Information Service
              Damaturu, Yobe State. For further enquiries, contact the Customer Care on{' '}
              <b>(Phone Number)</b> or send e-mail to <b>(e-mail address)</b>. Thanks
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
          </Boxed>
        )}
      </Boxed>
    </Boxed>
  );
};
