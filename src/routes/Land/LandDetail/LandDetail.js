import React, { useEffect } from 'react';

import { Grid } from '../../../components/Grid.components';
import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { PageTitle } from '../../../components/style';
import { FileComponent } from '../../../components/File.components';
import { Loader } from '../../../components/Loader.components';
import { Button } from '../../../components/Button.components';

import { Theme } from '../../../utils/theme';
import { formatCurrency } from '../../../utils/utils';
import moment from 'moment';

const TextLabel = ({ label, description }) => (
    <Boxed pad="8px 0">
        <Text fontSize={Theme.SecondaryFontSize} color={Theme.SecondaryTextColor}>
            {label}
        </Text>
        <Text>{description}</Text>
    </Boxed>
);

const SubsequentTransCard = ({ data }) => {
    return (
        <Boxed border={`0.5px solid ${Theme.SecondaryBorderColor}`} borderRadius={Theme.PrimaryRadius} background={"#FFF"} pad='10px 0' boxShadow={Theme.PrimaryShadow} >
            <Grid desktop="repeat(3, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(3, 1fr)" gap="0">
                <Boxed pad="5px" >
                    <Text >{data.referenceNo}</Text>
                    <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>Reference No.</Text>
                </Boxed>
                <Boxed pad="5px" >
                    <Text >{data.registrationNumber}</Text>
                    <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>Reg. No.</Text>
                </Boxed>
                <Boxed pad="5px" >
                    <Text >{data.subTransType}</Text>
                    <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>Type</Text>
                </Boxed>
            </Grid>
            <Boxed pad='5px'>
                <Text >{data.newOccupant}</Text>
                <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>new Occupant Name</Text>
            </Boxed>
            <Grid desktop="repeat(3, 1fr)" tablet="repeat(3, 1fr)" mobile="repeat(2, 1fr)" gap="0">
                <Boxed pad='5px' >
                    <Text >{data.regPage}</Text>
                    <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>Reg. Page</Text>
                </Boxed>
                <Boxed pad='5px' >
                    <Text >{data.volume}</Text>
                    <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>Volume</Text>
                </Boxed>
                <Boxed pad='5px' >
                    <Text >{data?.registrationDate && moment(data?.registrationDate).format('ll')}</Text>
                    <Text fontSize={`10px`} color={Theme.SecondaryTextColor}>Reg. Date</Text>
                </Boxed>
            </Grid>
        </Boxed >
    )
}

export const LandDetail = (props) => {
    // state props received
    const { landData, params, archivedList, ownersDetail, isloadingDocuments, subsequentTransList } = props;

    // dispatch props received
    const { redirect, openFile, getLandDetails, getLandOwner } = props;

    useEffect(() => {
        if (params.id) {
            getLandDetails(landData);
            if (landData.assigned) {
                getLandOwner({ id: landData.ownerId })
            }
        }
    }, []);

    console.log({ landData, ownersDetail, subsequentTransList })

    return (
        <Boxed pad="20px">
            <Boxed align="right" pad="15px 0" className="no-print">
                <Button
                    clear
                    color={Theme.SecondaryTextColor}
                    onClick={() => redirect("/lands")}
                >
                    Back
                </Button>
            </Boxed>
            {/* <PageTitle>Land Detail</PageTitle> */}
            <Text padding="10px 0" color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize} fontWeight="600">Land Detail</Text>
            <TextLabel label="Plot Number" description={landData.parcelNumber} />
            <Grid desktop="repeat(3, 1fr)" tablet="repeat(3,1fr)" mobile="repeat(2, 1fr)">
                <TextLabel label="Registration Number" description={landData.registrationNumber} />
                <TextLabel label="ROFO Number" description={landData.rofoNumber} />
                <TextLabel label="COFO Number" description={landData.cofoNumber} />

                <TextLabel label="Land Use" description={landData.landUse} />
                <TextLabel label="Land Type" description={landData.landType} />
                <TextLabel label="Land Size" description={`${landData?.landSize ? formatCurrency(landData.landSize) : 0} square meter`} />

                <TextLabel label="Allocation Number" description={landData.allocationNumber} />
                <TextLabel label="Reg. Page" description={landData.regPage} />
                <TextLabel label="Volume No." description={landData.volumeNo} />

                <TextLabel label="Allocation Number" description={landData.allocationNumber} />
                <TextLabel label="Reg. Page" description={landData.regPage} />
                <TextLabel label="Volume No." description={landData.volumeNo} />

                <TextLabel label="Reg. Date" description={landData.regDate} />
                <TextLabel label="Reg. Time" description={landData.regTime} />
                <div />

                <TextLabel label="Rent Rate" description={landData.rentRate} />
                <TextLabel label="Rent Revision" description={landData.rentRevision} />
                <div />

                <TextLabel label="Last Payment Amount" description={landData?.amount && formatCurrency(landData?.amount)} />
                <TextLabel label="Last Payment Method" description={landData.paymentOfMethod} />
                <TextLabel label="Last Payment Date." description={landData?.lastPaymentDate && moment(landData?.lastPaymentDate).format('ll')} />


            </Grid>
            <TextLabel label="Legal Description" description={landData.legalDescription} />


            <Text padding="30px 0 10px 0" color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize} fontWeight="600">Owner's Detail</Text>
            <TextLabel label="Owner's Name" description={`${ownersDetail?.firstname} ${ownersDetail?.lastName} `} />
            <Grid desktop="repeat(3, 1fr)" tablet="repeat(3,1fr)" mobile="repeat(2, 1fr)">

                <TextLabel label="Email" description={ownersDetail.email} />
                <TextLabel label="Phone" description={ownersDetail.phone} />
                <TextLabel label="Plot" description={ownersDetail.parcelNumber} />
                <TextLabel label="Plot" description={ownersDetail.parcelNumber} />



            </Grid>
            <TextLabel label="Address" description={ownersDetail.residentialAddress} />

            <Text padding="30px 0 10px 0" color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize} fontWeight="600">Archived Documents</Text>
            {isloadingDocuments ? (
                <Boxed pad="20px" display="flex">
                    <Loader margin="auto" />
                </Boxed>
            ) : (
                <Boxed pad="10px 0">
                    <Grid desktop="repeat(4, 1fr)" tablet="repeat(3,1fr)" mobile="repeat(2, 1fr)">
                        {archivedList?.map((item, index) => {
                            return (
                                <Boxed pad="10px" key={index}>
                                    <Boxed pad="0 0 10px 0" align="center" cursor="pointer">
                                        <FileComponent
                                            size="50px"
                                            type="pdf"
                                            onClick={() =>
                                                openFile({
                                                    fileName: item,
                                                    ParcelNumber: landData.parcelNumber
                                                })
                                            }
                                            name={item}
                                        />
                                    </Boxed>
                                </Boxed>
                            );
                        })}
                    </Grid>
                </Boxed>
            )}

            <Text padding="30px 0 10px 0" color={Theme.SecondaryTextColor} fontSize={Theme.SecondaryFontSize} fontWeight="600">Subsequent Transaction</Text>
            <Grid desktop="repeat(3, 1fr)" tablet='repeat(2, 1fr)' mobile="repeat(1, 1fr)">
                {
                    subsequentTransList?.map((item, index) => {
                        return (
                            <Boxed pad="10px">
                                <SubsequentTransCard data={item} key={index} />
                            </Boxed>
                        )
                    })
                }
            </Grid>

        </Boxed>
    );
};
