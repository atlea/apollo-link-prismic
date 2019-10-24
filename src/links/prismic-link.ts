import {
    ApolloLink
} from "apollo-link";

import {
    HttpLink
} from "apollo-link-http";

import {
    PrismicLinkAuth
} from "./prismic-link-auth";

import {
    getPrismicGraphqlUrl
} from "./prismic-link-utils";

type PrismicLinkOptions = {
    /* Your prismic access token */
    accessToken?: string;
    /* A fallback fetch implementation */
    fetch?: WindowOrWorkerGlobalScope["fetch"];
    /* Your prismic repository name */
    repositoryName: string;
}

function PrismicLink(options: PrismicLinkOptions) {
    const httpOptions = {
        fetch: options.fetch,
        uri: getPrismicGraphqlUrl(options.repositoryName),
        useGETForQueries: true
    }

    return new PrismicLinkAuth(options)
        .concat(new HttpLink(httpOptions));
}

export {
    PrismicLink,
    PrismicLinkOptions
};