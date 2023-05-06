import React, { useEffect } from 'react';
import moment from 'moment'

import { Grid } from '../../../components/Grid.components';
import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { Button } from '../../../components/Button.components';

import LOGO from '../../../assets/img/logo.png';

import { Theme } from '../../../utils/theme';
import { formatCurrency } from '../../../utils/utils';

export const ROFO = (props) => {
  // state props received
  const { params, landData, ownersDetail, getLandOwner } = props;

  // dispatch props received
  const { redirect, getSingleLand } = props;

  useEffect(() => {
    if (params?.ParcelNumber) {
      getSingleLand({ search: params.ParcelNumber });
    }
  }, []);

  useEffect(() => {
    if (landData?.ownerId) {
      getLandOwner({ id: landData?.ownerId });
    }
  }, [landData?.ownerId]);

  let fullName =
    ownersDetail?.firstname ? `${ownersDetail?.firstname} ${ownersDetail?.middlename ?? ''} ${ownersDetail?.lastname}`
      : ownersDetail?.name;
  let address = ownersDetail?.ownershipType?.toLowerCase() === 'private' ? ownersDetail?.residentialAddress : ownersDetail?.registrationAddress;

  return (
    <Boxed pad="0 20px">
      <Boxed align="right" pad="15px 0" className="no-print">
        <Button clear color={Theme.SecondaryTextColor} onClick={() => redirect('/lands')}>
          Back
        </Button>{' '}
        <Button onClick={() => window.print()}>Print</Button>
      </Boxed>

      <Boxed display="flex">
        <Boxed
          className="page-break-print"
          pad="20px"
          background="#FFFFFF"
          margin="10px auto"
          maxWidth="800px"
        >
          <Grid default="1.5fr 1fr 1.5fr" tablet="1.5fr 1fr 1.5fr" mobile="1.5fr 1fr 1.5fr">
            <Boxed display="flex">

            </Boxed>
            <Boxed display="flex">
              <img src={LOGO} height="100px" style={{ margin: 'auto' }} />
            </Boxed>
            <Boxed display="flex">

            </Boxed>
          </Grid>

          <Grid default="1.5fr 1fr 1.5fr" tablet="1.5fr 1fr 1.5fr" mobile="1.5fr 1fr 1.5fr">
            <Boxed display="flex">
              <Text margin="auto 0" >
                R of O No: <b>{landData?.rofoNumber ?? `****`} </b> <br />
                To: <b>{fullName}</b><br />
                Address: <b>{address ?? `****`}</b><br />
                Application Number: <b>{landData?.applicationNumber ?? `****`}</b> <br />
              </Text>
            </Boxed>
            <Boxed display="flex">

            </Boxed>
            <Boxed display="flex">
              <Text margin="auto 0" >
                Ref.No: <b>{landData?.rofoReferenceNumber ?? `****`}</b> <br />
                Yobe <br />
                Yobe Geographic Information Service (YOGIS)<br />
                P.M.B 1070 <br />
                Ibrahim Babanginda Secretariat, <br />
                Damaturu, Yobe State <br />
                Date: {landData?.regDate ? moment(landData?.regDate).format('ll') : `****`}
              </Text>
            </Boxed>
          </Grid>
          <Text fontSize={Theme.SecondaryFontSize}>Sir,</Text>

          <Text align="center" fontWeight="600" stlye={{ TextDecoder: 'underline' }}>
            RE-APPLICATION OF GRANT FOR THE RIGHT OF OCCUPANCY
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            <ol>
              <li>
                With reference to your application dated <b>{landData?.applicationDate ? moment(landData?.applicationDate).format('ll') : `****`}</b> which was forwarded to Yobe
                Geographic Information Service under the Zonal Officer’s/letter
                No: <b>{landData?.rofoReferenceNumber ?? `****`}</b> of <b>{landData?.applicationDate ? moment(landData?.applicationDate).format('ll') : `****`}</b>. I am directed to inform you the approval of a
                *grant/regrant of a Right of Occupancy to you in respect of <b>{landData?.parcelNumber}</b>.
                <br />
                On the following terms:
                <ol>
                  <li>
                    Premium <b>₦ {landData?.premium ? formatCurrency(landData?.premium) : `****`}</b>
                  </li>
                  <li>
                    Rent <b>₦ {landData?.rentRate ? formatCurrency(landData?.rentRate) : `****`} Per Sq. meter</b>
                  </li>
                  <li>
                    Improvement <b>₦ {landData?.valueOfImprovement ? formatCurrency(landData?.valueOfImprovement) : `****`}</b>
                  </li>
                  <li>
                    Term <b>{landData?.lengthOfTerm ? formatCurrency(landData?.lengthOfTerm) : `****`} </b> Years.
                  </li>
                  <li>
                    Rent revision <b>{landData?.rentRevision ?? `****`}</b>
                  </li>
                  <li>
                    Purpose(s): <b>{landData?.landUse ?? `****`}</b>
                  </li>
                </ol>
              </li>
              <li>
                This grant/regrant is right of occupancy No: <b>{landData?.rofoNumber}</b>.
              </li>
              <li>
                I am to add that the following conditions will also be inserted in the certificate
                of occupancy evidencing *grant/regrant of this occupancy.
                <br />
                Within <b> {landData?.lengthOfTerm ? formatCurrency(landData?.lengthOfTerm) : `****`} years</b> from the date of commencement of this Right of Occupancy to erect and
                complete on the said land buildings or other works specified in details plans
                approved or to be approved by the *Director Public Building Yobe State or other
                officer so appointed, such building or other to be of not less than
                <b> ₦ {landData?.valueOfImprovement ? formatCurrency(landData?.valueOfImprovement) : '****'} </b>and to erect and completed in accordance with such plans and
                to the satisfaction of the Director Public Building Yobe State or other officer so
                appointed.
                <br />
                “Not to erect or build or permit to be erected by virtue of the certificate of
                occupancy not to make or permit to be made, any addition or alter to the said
                building to be erected or building already erected on the land except in accordance
                with plans and specification approved by the Director Public Building, Yobe State or
                other officers so appointed in his behalf.
                <br />
                “Not to alienate the right of occupancy hereby *grant/re granted of any part thereof
                by sale, mortgage, transfer of possession, sublease or bequest or otherwise how so
                ever without the consent the executive Governor first had and obtained.
                <br />
              </li>
              <li>
                Please return two copies of this letter to the Director General after signifying
                your acceptance of these terms in the space.
              </li>
              <li>
                The date of commencement of this right of occupancy will be the date of acceptance
                as signified by you on the letter and should be within one month of the receipt of
                this letter by you.
              </li>
              <li>
                It is a condition of the grant that you should pay survey fees as may be charged by
                the Surveyor General.
              </li>
              <li>
                When accepting the terms and conditions, you must state whether you require the land
                which is the subject of this Right of Occupancy to be demarcated and surveyed by the
                Surveyor General or by licensed surveyor nominated by you. In the event of
                nominating your licensed surveyor, and if a licensed surveyor fails to submit to the
                Surveyor General within six months of the date of issue of the Surveyor General
                authority (as required in the regulations published as N.E.LN137 of 1962) a
                satisfactory plan of the demarcation on survey of the land in accordance with survey
                regulations then, the Surveyor General may at this discretion withdraw authority and
                arrange himself for demarcation and survey.
              </li>
              <li>Subject to the payment of compensation at rate to be determined later.</li>
            </ol>
          </Text>

          <Boxed display="flex" width="100%">
            <Boxed pad="50px 0 10px 0" margin="0 auto" maxWidth="400px">
              <Text
                align="center"
                fontWeight="600"
                style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}` }}
              >
                Director General (YOGIS)
              </Text>
            </Boxed>
          </Boxed>
        </Boxed>
      </Boxed>
    </Boxed>
  );
};
