import React, { useEffect } from "react";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";

import LOGO from '../../../assets/img/logo.png'

import { Theme } from "../../../utils/theme";

export const ROFO = (props) => {
    // state props received
    const { params, parcelData, parcelOwner } = props;

    // dispatch props received
    const { redirect, getParcelDetails } = props;

    useEffect(() => {
        getParcelDetails({ search: params.ParcelNumber });
    }, []);

    const fullName = `${parcelOwner.firstname} ${parcelOwner.middlename} ${parcelOwner.lastname}`;

    return (
        <Boxed pad="10px 20px">
            <Boxed align="right" pad="15px 0" className="no-print">
                <Button
                    clear
                    color={Theme.SecondaryTextColor}
                    onClick={() => redirect("/parcels")}
                >
                    Back
                </Button>{" "}
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
                    <Text align="center" fontSize="24px" fontWeight="600" color={Theme.PrimaryGreen}>
                        YOBE STATE GOVERNMENT OF NIGERIA
                    </Text>


                    <Grid default="1.5fr 1fr 1.5fr" tablet="1.5fr 1fr 1.5fr" mobile="1.5fr 1fr 1.5fr">
                        <Boxed display="flex">
                            <Text margin="auto 0" fontWeight="600">
                                To: XXXXXXXXXXXXXXXXXXXXXX
                            </Text>
                        </Boxed>
                        <Boxed display="flex">
                            <img src={LOGO} height="100px" style={{ margin: "auto" }} />
                        </Boxed>
                        <Boxed display="flex">
                            <Text margin="auto 0" fontWeight="600">
                                LAND 3 <br />
                                Ref.No. XX/XXX/LAN/39086 <br />
                                Yobe Geographic Information Service
                                YOGIS, Damaturu <br />
                                Date: 24/01/2022
                            </Text>
                        </Boxed>
                    </Grid>
                    <Text
                        padding="10px 0"
                        align="center"
                        fontWeight="600"
                    >
                        R of O No: YB/42356
                    </Text>
                    <Text
                        fontSize={Theme.SecondaryFontSize}
                    >
                        Sir,
                    </Text>

                    <Text
                        align="center"
                        fontWeight="600"
                    >
                        APPLICATION FOR THE GRANT OF RIGHT OF OCCUPANCY
                    </Text>
                    <Text
                        fontSize={Theme.SecondaryFontSize}
                    >
                        <ol>
                            <li>
                                With reference to your application dated <b>28th of October, 2020</b> which was forwarded to this
                                day………….. to Yobe Geographic Information Service (YOGIS) under the Area Estate officer's letter
                                <b>NO. YB/42356</b> of <b>24TH NOVEMBER 2020</b>. I am directed to inform you of the approval of
                                grant/regrant of a Right of Occupancy in respect of <b>……………………………………………………legal
                                    description of the parcel of Land……………………………………………………………</b> for
                                <b>….……RESIDENTIAL USE…………………</b> On the following terms:-

                                <ol>
                                    <li>Rent <b>₦2,344.00 ( TWO THOUSAND, THREE HUNDRED AND FORTY-FOUR NAIRA)</b> per annum</li>
                                    <li>Improvement <b>₦2,000,000.00 ( TWO MILLION NAIRA)</b> (within Every five years)</li>
                                    <li>Term <b>NINETY NINE</b> years.</li>
                                    <li>Rent revision every <b>FIVE</b> years.</li>
                                    <li>Purpose(s) <b>RESIDENTIALL</b></li>
                                </ol>
                            </li>
                            <li>This * grant/regrant is Right of Occupancy No. <b>YB/42356</b></li>
                            <li>
                                I am to add that the following conditions will also be inserted in the Certificate evidencing the "grant/regrant of
                                this right of occupancy:-
                                <ol>
                                    <li>
                                        "Within TWO years from the date of commencement of this Right of Occupancy to erect and complete on the
                                        said land and buildings or other works specified in detail plans approved or to be approved by Yobe State
                                        Development Board or the other Officer so appointed. Such building or other words to be of not less than
                                        <b>5,000,000.00</b> And to be erected and completed with such plans and to the satisfaction of the Chief Architect Yobe State
                                        Development Board or other Officer so appointed.
                                    </li>
                                    <li>
                                        "Not to erect or build or permit to be erected or build on the said land, buildings other than those
                                        covenanted to be erected by virtue of the Certificate of Occupancy. Not to make or permit to be made any
                                        addition or alteration to the said building to be erected or building already erected on the land except on the
                                        land in accordance with the plans and specifications recommended by the Chief Architect,
                                        Yobe State Development Board or other Officer so appointed in this behalf.
                                    </li>
                                    <li>
                                        “Not to alienate the Right of Occupancy hereby granted/regranted or any part thereof by sale, mortgage,
                                        transfer of possession, sublease or bequest or otherwise howsoever without consent first had and
                                        obtained”
                                    </li>
                                </ol>
                            </li>
                            <li>
                                Please return two copies of this letters to the Area Estate Officer after signing your acceptance of
                                these terms in the space below"
                            </li>
                            <li>
                                The date of commencement of this Right of Occupancy will be the date of acceptance as signified by you,
                                and should be within one month of the receipt of this letter by you
                            </li>
                            <li>
                                It is a condition of the grant that you should pay such survey fees as may be charged by the Surveyor
                                General.
                            </li>
                            <li>
                                When accepting the terms and conditions, you must state whether you require the land which is the subject
                                of this Right of Occupancy to be demarcated and surveyed by the Surveyor General or by a Licensed
                                Surveyor nominated by you. In the event of nominating a licensed Surveyor and if the Licenced Surveyor
                                fails to submit to the Surveyor General within six months of the date of the issue of the Surveyor General
                                authority (as required in the regulations published as N.E.L.N. 137 of 1962) a satisfactory plan of the
                                demarcation and survey of the land in accordance with survey regulations, then the Surveyor General may,
                                at his discretion withdraw the authority and arrange himself for the demarcation and survey.
                            </li>
                        </ol>
                    </Text>

                    <Grid desktop="auto 200px" tablet="auto 200px" mobile="auto 200px">
                        <div />
                        <Boxed pad="10px 0" style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}` }} >
                            <Text align="center" fontWeight='600'>Director General (YOGIS)</Text>
                        </Boxed>
                    </Grid>
                </Boxed>
            </Boxed>
            <Boxed display="flex" className="page-break-after">
                <Boxed
                    className="page-break-print"
                    pad="20px"
                    background="#FFFFFF"
                    margin="10px auto"
                    maxWidth="800px"
                >
                    <Text fontWeight="600">
                        Director General, Yobe <br />
                        Geographic Information <br />
                        Service <br />
                        YOBE STATE <br />
                        <br />
                        u.f.s Area Estate Officer.
                    </Text>

                    <Text padding="10px 0">
                        I hereby accept the terms and conditions of the "grant/regrant" of this Right of Occupancy as stipulated above.
                        2.1. I hereby state that I require the land to be demarcated and surveyed by either: -

                        <ol>
                            <li>*The Surveyor General: or</li>
                            <li>
                                *A Licensed Surveyor. In this case, I will inform the Surveyor General of the nomination.
                            </li>
                        </ol>

                    </Text>

                    <Grid desktop="200px auto 200px" tablet="160px auto 160px" mobile="160px auto 160px">
                        <Boxed pad="10px 0" style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}` }} >
                            <Text align="center" fontWeight='600'>Date of Acceptance</Text>
                        </Boxed>
                        <div />
                        <Boxed pad="10px 0" style={{ borderTop: `1px dashed ${Theme.PrimaryTextColor}` }} >
                            <Text align="center" fontWeight='600'>Applicant</Text>
                        </Boxed>
                    </Grid>
                </Boxed>
            </Boxed>
        </Boxed>
    );
};
