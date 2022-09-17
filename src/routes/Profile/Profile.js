import React, { useEffect } from 'react';

import { Grid } from '../../components/Grid.components';
import { Boxed } from '../../components/Boxed.components';
import { PageTitle } from '../../components/style';
import { Text } from '../../components/Text.components';

import { Theme } from '../../utils/theme';
import { Label } from '../../components/Input.components';

import LOGIN_BG from "../../assets/img/gis-landing.png";

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
        params } = props

    // Dispatch props received
    const { redirect, getUserDetails } = props

    useEffect(() => {
        getUserDetails({ id: params.userId })
    }, [params.userId])

    console.log({ params })
    return (
        <Boxed pad="20px">
            <PageTitle>
                Profile / Ijeh Michael
            </PageTitle>

            <Label>User Details</Label>
            <Grid desktop="repeat(3, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(1, 1fr)">
                <LabelText label="Surname" value="Ijeh" />
                <LabelText label="First Name" value="Michael" />
                <LabelText label="Middle Name" value="Ifeanyi" />

                <LabelText label="Email" value="Ijeh" />
                <LabelText label="Phone Number" value="Michael" />
                <LabelText label="Date of Birth" value="Ifeanyi" />

                <LabelText label="Country of Origin" value="Ijeh" />
                <LabelText label="State of Origin" value="Michael" />
                <LabelText label="Local Gov. Area of Origin" value="Ifeanyi" />

                <LabelText label="Country of Residence" value="Ijeh" />
                <LabelText label="State of Residence" value="Michael" />
                <LabelText label="Local Gov. Area of Residence" value="Ifeanyi" />

                <LabelText label="Surname" value="Ijeh" />
                <LabelText label="First Name" value="Michael" />
                <LabelText label="Middle Name" value="Ifeanyi" />
            </Grid>

            <Label>User Plot(s)</Label>
            <Grid desktop="repeat(4, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(1, 1fr)">
                <Boxed pad="5px">
                    <PlotCard
                        parcelNumber='YB/354334'
                        callBack={() => redirect(`/parcels/detail/${'0000002'}`)}
                    />
                </Boxed>
                <Boxed pad="5px">
                    <PlotCard
                        parcelNumber='YB/888334'
                        callBack={() => redirect(`/parcels/detail/${'0000003'}`)}
                    />
                </Boxed>
                <Boxed pad="5px">
                    <PlotCard
                        parcelNumber='YB/9994354'
                        callBack={() => redirect(`/parcels/detail/${'0000004'}`)}
                    />
                </Boxed>
                <Boxed pad="5px">
                    <PlotCard
                        parcelNumber='YB/4444354'
                        callBack={() => redirect(`/parcels/detail/${'0000005'}`)}
                    />
                </Boxed>
            </Grid>
        </Boxed>
    )
}