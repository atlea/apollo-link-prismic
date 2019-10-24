"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var apolloLinkHttp=require("apollo-link-http"),tslib=require("tslib"),apolloLink=require("apollo-link");function extractPrismicMasterRef(t){return t.refs.filter((function(t){return t.isMasterRef}))[0].ref}function getPrismicGraphqlUrl(t){return"//"+t+".cdn.prismic.io/graphql"}function getPrismicRestApiUrl(t){return"//"+t+".cdn.prismic.io/api/v2"}var _fetch="undefined"==typeof window?global.fetch:window.fetch,PrismicLinkAuth=function(t){function e(e){var i=t.call(this)||this;return i.options=e,i}return tslib.__extends(e,t),e.prototype.request=function(t,e){var i=this.options,r=i.accessToken,n=i.fetch,o=void 0===n?_fetch:n,s=getPrismicRestApiUrl(i.repositoryName);return new apolloLink.Observable((function(i){var n;return o(s,{headers:{Accept:"application/json"}}).then((function(t){return t.json()})).then(extractPrismicMasterRef).then((function(e){var i=tslib.__assign({"Prismic-Ref":e},t.getContext().headers);return r&&Object.assign(i,{Authentication:r}),i})).then((function(e){return tslib.__assign(tslib.__assign({},t.getContext()),{headers:e})})).then(t.setContext).then((function(){n=e(t).subscribe({next:i.next.bind(i),error:i.error.bind(i),complete:i.complete.bind(i)})})).catch(i.error.bind(i)),function(){var t;return null===(t=n)||void 0===t?void 0:t.unsubscribe()}}))},e}(apolloLink.ApolloLink);function PrismicLink(t){var e={fetch:t.fetch,uri:getPrismicGraphqlUrl(t.repositoryName),useGETForQueries:!0};return new PrismicLinkAuth(t).concat(new apolloLinkHttp.HttpLink(e))}exports.PrismicLink=PrismicLink;