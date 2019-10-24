import { ApolloLink, FetchResult, Observable, Operation, NextLink } from "apollo-link";
import { PrismicLinkOptions } from "./prismic-link";
declare class PrismicLinkAuth extends ApolloLink {
    private options;
    constructor(options: PrismicLinkOptions);
    request(operation: Operation, forward: NextLink): Observable<FetchResult<{
        [key: string]: any;
    }, Record<string, any>, Record<string, any>>>;
}
export { PrismicLinkAuth };
