import React, { useEffect } from 'react';

import { Grid } from '../../components/Grid.components';
import { Boxed } from '../../components/Boxed.components';
import { PageTitle } from '../../components/style';
import { Text } from '../../components/Text.components';

import { Theme } from '../../utils/theme';
import { Label } from '../../components/Input.components';

import LOGIN_BG from "../../assets/img/gis-landing.png";
import { formatDate } from '../../utils/utils';
import { Loader } from '../../components/Loader.components';

const LabelText = ({ label, value }) => {
    return (
        <Boxed pad="10px 0">
            <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
            >
                {label}
            </Text>
            <Text padding="0 5px">
                {value}
            </Text>
        </Boxed>
    )
}

const PlotCard = (props) => {
    const { parcelNumber, landUse, callBack } = props

    return (
        <Boxed
            background="#FFFFFF"
            cursor="pointer"
            onClick={callBack ? () => callBack(props) : () => { }}
        >
            <Boxed>
                <img src={LOGIN_BG} alt="land_image" style={{ width: "100%", maxHeight: "200px" }} />
            </Boxed>
            <Boxed pad="5px">
                <Text>{parcelNumber}</Text>
                <Text>{landUse}</Text>
            </Boxed>
        </Boxed>
    )
}

export const Profile = props => {
    // State props received
    const {
        isLoading,
        params, usersDetail } = props

    // Dispatch props received
    const { redirect, getUserDetails } = props

    useEffect(() => {
        getUserDetails({ userId: params.userId })
    }, [params.userId])



    return (
        <Boxed pad="20px">
            <PageTitle>
                Profile / {usersDetail.lastname} {usersDetail.firstname} {usersDetail.middlename}
            </PageTitle>

            {(isLoading) ? <Boxed minHeight='75vh'>
                <Loader margin="auto" />
            </Boxed> : <>
                <Label>User Details</Label>
                <Grid desktop="repeat(3, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(1, 1fr)">
                    <LabelText label="National Identification Number" value={usersDetail.nin} />
                    <div />
                    <div />

                    <LabelText label="Surname" value={usersDetail.lastname} />
                    <LabelText label="First Name" value={usersDetail.firstname} />
                    <LabelText label="Middle Name" value={usersDetail.middlename} />

                    <LabelText label="Email" value={usersDetail.email} />
                    <LabelText label="Phone Number" value={usersDetail.phone} />
                    <LabelText label="Date of Birth" value={usersDetail?.dob && formatDate(usersDetail.dob)} />

                    <LabelText label="Country of Origin" value={usersDetail.countryOfOrigin ?? 'Nigeria'} />
                    <LabelText label="State of Origin" value={usersDetail.stateOfOrigin} />
                    <LabelText label="Local Gov. Area of Origin" value={usersDetail.lgaOfOrigin} />
                </Grid>
                <Grid desktop="repeat(3, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(1, 1fr)">
                    <LabelText label="Country of Residence" value={usersDetail.countryOfResidence ?? 'Nigeria'} />
                    <LabelText label="State of Residence" value={usersDetail.stateOfResidence} />
                    <LabelText label="Local Gov. Area of Residence" value={usersDetail.lgaOfResidence} />
                </Grid>
                <LabelText label="Address of Residential Address" value={usersDetail.residentialAddress} />

                <Label>Owned Plot(s)</Label>
                <Grid desktop="repeat(4, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(1, 1fr)">
                    {
                        usersDetail?.ownerPlots && usersDetail?.ownerPlots.map(item => (
                            <Boxed pad="5px">
                                <PlotCard
                                    parcelNumber={item}
                                    callBack={() => redirect(`/parcels/detail/${item}`)}
                                />
                            </Boxed>
                        ))
                    }
                </Grid>
            </>
            }


        </Boxed>
    )
}