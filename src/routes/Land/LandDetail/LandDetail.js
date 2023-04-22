import { useEffect } from 'react';

import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { PageTitle } from '../../../components/style';

export const LandDetail = (props) => {
    // state props received
    const { landData,
        params,
        archivedList,
        isLoading,
        isloadingDocuments, } = props;

    // dispatch props received
    const { redirect, getSingleLand, openFile } = props;

    useEffect(() => {
        if (params.id) {
            getSingleLand({ page: 1, size: 5, search: params.id });
        }
    }, []);

    return (
        <Boxed pad="20px">
            <PageTitle>Land Detail</PageTitle>
            <Text> Details of a land.</Text>
        </Boxed>
    );
};
