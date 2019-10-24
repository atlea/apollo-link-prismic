
import {
    ApolloLink,
    FetchResult,
    Observable,
    Operation,
    NextLink
} from "apollo-link";

import {
    PrismicLinkOptions
} from "./prismic-link";

import {
    extractPrismicMasterRef,
    getPrismicRestApiUrl
} from "./prismic-link-utils";

const _fetch: WindowOrWorkerGlobalScope["fetch"] =
    (typeof window === "undefined")
    // @ts-ignore
    ? global.fetch
    : window.fetch;

class PrismicLinkAuth extends ApolloLink {
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

        const apiurl = new URL(getPrismicRestApiUrl(repositoryName));

        if (accessToken) {
            apiurl.searchParams.append("access_token", accessToken);
        }

        return new Observable<FetchResult>(observer => {
            let handle: any;

            fetch(`${apiurl}`, { headers: { Accept: "application/json" } })
                .then(response => response.json())
                .then(extractPrismicMasterRef)
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

export {
    PrismicLinkAuth
};