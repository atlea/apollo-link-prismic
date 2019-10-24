
import {
    ApolloLink, Operation, NextLink, Observable
} from "apollo-link";

type PrismicLinkOptions = {
    /* Your prismic access token */
    accessToken?: string;
    /* A fallback fetch implementation */
    fetch?: WindowOrWorkerGlobalScope["fetch"];
    /* Your prismic repository name */
    repositoryName: string;
}

const _fetch: WindowOrWorkerGlobalScope["fetch"] =
    (typeof window === "undefined")
    // @ts-ignore
    ? global.fetch
    : window.fetch;

class PrismicLink extends ApolloLink {
    private options: PrismicLinkOptions;

    public constructor(options: PrismicLinkOptions) {
        super();
        this.options = options;
    }

    public request(operation: Operation, forward: NextLink) {
        const {
            accessToken,
            fetch = _fetch,
            repositoryName
        } = this.options;

        const apiurl = getPrismicRestApiUrl(repositoryName);

        return new Observable(observer => {
            let handle: any;

            fetch(apiurl, { headers: { Accept: "application/json" } })
                .then(response => response.json())
                .then(response => response.refs.filter((ref: any) => ref?.isMasterRef)[0]?.ref)
                .then(prismref => {
                    const headers = {
                        "Prismic-Ref": <string>prismref,
                        ...operation.getContext().headers
                    };

                    if (accessToken) {
                        Object.assign(headers, { Authentication: accessToken });
                    }

                    return headers;
                })
                .then(headers => {
                    const context = {
                        ...operation.getContext(),
                        headers
                    };

                    return context;
                })
                .then(operation.setContext)
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    });
                })
                .catch(observer.error.bind(observer));

            return () => handle?.unsubscribe();
        });
    }
}

function getPrismicRestApiUrl(repository: string) {
    return `//${repository}.cdn.prismic.io/api/v2`;
}

function getPrismicGraphqlApiUrl(repository: string) {
    return `//${repository}.cdn.prismic.io/graphql`;
}

export {
    PrismicLink
};