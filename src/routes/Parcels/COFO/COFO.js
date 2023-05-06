import React, { useEffect } from 'react';
import moment from 'moment';

import { Grid } from '../../../components/Grid.components';
import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { Button } from '../../../components/Button.components';

import ARROW_ICON from '../../../assets/img/north-arrow.png';

import { MAP_URL } from '../../../utils/config';
import { Theme } from '../../../utils/theme';

import TDP from '../TDP/index';
import { formatCurrency } from '../../../utils/utils';

export const COFO = (props) => {
  // state props received
  const { params, landData, ownersDetail } = props;

  // dispatch props received
  const { redirect, getSingleLand, getLandOwner } = props;

  useEffect(() => {
    getSingleLand({ search: params.ParcelNumber });
  }, []);

  useEffect(() => {
    if (landData?.ownerId) {
      getLandOwner({ id: landData?.ownerId });
    }
  }, [landData?.ownerId]);

  let fullName = ownersDetail?.firstname ? `${ownersDetail?.firstname} ${ownersDetail?.middlename ?? ''} ${ownersDetail?.lastname}` : ownersDetail?.name;

  return (
    <Boxed pad="10px 20px">
      <Boxed align="right" pad="15px 0" className="no-print">
        <Button clear color={Theme.SecondaryTextColor} onClick={() => redirect('/lands')}>
          Back
        </Button>{' '}
        <Button onClick={() => window.print()}>Print</Button>
      </Boxed>

      <Boxed display="flex" className="page-break-after">
        <Boxed
          className="page-break-print"
          pad="20px"
          background="#FFFFFF"
          margin="10px auto"
          maxWidth="800px"
        >
          <Text align="center" fonstSize="24px" fontWeight="600">
            YOBE STATE GOVERNMENT OF NIGERIA
          </Text>

          <Text align="center" fontSize={Theme.SecondaryFontSize} fontWeight="600">
            The Land Use Act No 6 of 1978 <br />
            CERTIFICATE OF OCCUPANCY <br />
            NO: {landData.cofoNumber}
            <br />
            <br />
          </Text>

          <Text fontSize="10.5px">
            This Is To Certify That <b>{fullName}</b> Whose address is{' '}
            <b>{ownersDetail.residentialAddress}</b>.
            <br />
            <br />
            (Herein after called the holder/holders, which term shall include any person/persons in
            tittle), is hereby granted a right of occupancy in and over the land described in the
            schedule, and more particularly in in the plan printed hereto for a term of <b>
              {landData?.lengthOfTerm ?? `****`}
            </b>{' '}
            years commencing from the
            {" "}<b>{landData?.regDate ? moment(landData?.regDate).format('ll') : '****'}</b> according to the true intent and meaning of the land Act No.6 of 1978
            and subject to the provisions thereof and the following special terms and conditions.
            <ol>
              <li>
                To pay in advance without demand to Director-General of Yobe Geographic Information
                Service. (Herein after referred to as the Director-General) or any other officer
                appointed by the Director-General of Yobe Geographic Information Service.
                <ul>
                  <li>
                    The revised annual ground rent of <b>₦ {landData?.rentRate ? formatCurrency(landData?.rentRate) : '****'}</b> from the first day of January
                    of each year, or{' '}
                  </li>
                  <li>
                    Such revised ground rent as the Yobe Geographic Information Service may from
                    time to time prescribed,
                  </li>
                  <li>
                    Such penal rent as the Yobe Geographic Information Service may from time to time
                    impose.
                  </li>
                </ul>
              </li>
              <li>
                To pay and discharge all rates (including utilities) assessments and impositions
                what so ever which shall at any time be charged or imposed on the said Land or any
                part of thereof or any building thereon, or upon the occupier thereof.
              </li>
              <li>
                To pay forthwith without demand to the Yobe Geographic Information Service or such
                other body or person appointed by the Director-General (If not sooner paid) all
                survey fees, and other charges due in respect of the preparation, registration and
                issuance of this certificate.
              </li>
              <li>
                Within two (2) years from the date of the commencement of this right of occupancy to
                erect and complete on the said land building(s) or other works specified in related
                plans to the value of not less than <b>₦ {landData?.valueOfImprovement ? formatCurrency(landData?.valueOfImprovement) : `****`}</b> and approved or to be
                approved by Yobe Geographic Information Service.
              </li>
              <li>
                To maintain in good and substantial repair to the satisfaction of the Yobe
                Geographic Information Service, all buildings on the said land and appurtenances
                thereto, and to do other works, properly maintained in clean and sanitation
                conditions all of the lands and surroundings of the buildings.
              </li>
              <li>Upon the expiration Board the said land and Building(s) thereon.</li>
              <li>
                Not to erect or build or permit to be erected or build on the land, buildings other
                than those permitted to be erected by virtue of this certificate of occupancy nor to
                make or permit to be made any additional or alteration to the said buildings already
                erected on the land except in accordance with the plans and specifications approved
                by the Yobe Geographic Information Service.
              </li>
              <li>
                The Yobe Geographic Information Service shall have the power to enter upon and
                inspect the land comprised in any statutory right of occupancy or any improvement
                effected thereon, at any reasonable hour during the day and the occupier shall
                permit and give free access to appointed officer so inspect.
              </li>
              <li>
                Not to alienate the right of occupancy hereby granted or any part thereof by sale,
                assignment, mortgage, transfer of possession, sub-lease or bequest, or otherwise
                however without the prior consent of the Director-General of Yobe Geographic
                Information Service.
              </li>
              <li>
                To use the said land only for <b>{landData?.landUse ?? '****'}</b>.
              </li>
              <li>
                Not contravene any of the provisions of the Land Use Act No: 6 of the 1978 and to
                conform and comply with all rules and regulations laid down from time to time by the
                Yobe Geographic Information Service.
              </li>
              <li>
                For the purpose of rent to be paid under this certificate of occupancy;
                <ul>
                  <li>
                    The annual rent shall be revised at the end of every <b>{landData.rentRevision ?? "****"}</b>  of
                    the term of this certificate.
                    <br />
                    If the commissioner shall so revise the rent, he shall cause a notice to be sent
                    to the holder/holders and the rent fixed of revise shall be payable one calendar
                    month from the date of the receipt of such notice.
                  </li>
                </ul>
              </li>
            </ol>
          </Text>

          <Grid desktop="auto 300px" tablet="auto 300px" mobile="auto 300px">
            <div />
            <Boxed>
              <Text
                padding="20px 0 10px 0"
                align="right"
                fontWeight="600"
                fontSize={Theme.SecondaryFontSize}
              >
                Dated this……… ……day of ………………20…………
                <br />
                Given under my hand the day and year above written
              </Text>
              <Text
                margin="40px 0 10px 0"
                padding="5px 0"
                align="center"
                style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}` }}
                fontWeight="600"
                fontSize={Theme.SecondaryFontSize}
              >
                (MAI MALA BUNI)
                <br />
                The Executive Governor, Yobe State
              </Text>
            </Boxed>
          </Grid>
          <Grid desktop="300px auto" tablet="300px auto" mobile="300px auto">
            <Boxed>
              <Text align="center" fontSize={Theme.SecondaryFontSize}>
                This instrument is registered as No <b>{landData?.registrationNumber ?? `****`}</b> at page <b>{landData?.regPage ?? `****`}</b>. In Volume <b>{landData?.volumeNo ?? `****`}</b>{' '}
                of the Certificate of Occupancy Registered in the Lands Registry in the Office,
                Damaturu.
              </Text>
              <Text
                margin="40px 0 10px 0"
                padding="5px 0"
                align="center"
                style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}` }}
                fontWeight="600"
                fontSize={Theme.SecondaryFontSize}
              >
                Deed Registrar
              </Text>
            </Boxed>
          </Grid>
        </Boxed>
      </Boxed>

      {/* ######################     S T A R T   :   T D P    ###################### */}
      <TDP />
      {/* ######################     E N D  :   T D P    ###################### */}
    </Boxed>
  );
};
