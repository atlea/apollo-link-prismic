import { ApolloLink } from "apollo-link";
declare type PrismicLinkOptions = {
    accessToken?: string;
    fetch?: WindowOrWorkerGlobalScope["fetch"];
    repositoryName: string;
};
declare function PrismicLink(options: PrismicLinkOptions): ApolloLink;
export { PrismicLink, PrismicLinkOptions };
