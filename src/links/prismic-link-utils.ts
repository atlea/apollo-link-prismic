type PrismicRestApiResponse = {
    refs: [{ 
        ref: string;
        isMasterRef: boolean;
    }];
};

function extractPrismicMasterRef(response: PrismicRestApiResponse) {
    return response.refs.filter(ref => ref.isMasterRef)[0].ref;
}

function getPrismicGraphqlUrl(repository: string) {
    return `//${repository}.cdn.prismic.io/graphql`;
}

function getPrismicRestApiUrl(repository: string) {
    return `//${repository}.cdn.prismic.io/api/v2`;
}

export {
    extractPrismicMasterRef,
    getPrismicGraphqlUrl,
    getPrismicRestApiUrl
};