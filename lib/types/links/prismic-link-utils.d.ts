declare type PrismicRestApiResponse = {
    refs: [{
        ref: string;
        isMasterRef: boolean;
    }];
};
declare function extractPrismicMasterRef(response: PrismicRestApiResponse): string;
declare function getPrismicGraphqlUrl(repository: string): string;
declare function getPrismicRestApiUrl(repository: string): string;
export { extractPrismicMasterRef, getPrismicGraphqlUrl, getPrismicRestApiUrl };
