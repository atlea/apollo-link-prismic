import{HttpLink as t}from"apollo-link-http";import{__extends as e,__assign as n}from"tslib";import{Observable as r,ApolloLink as o}from"apollo-link";function i(t){return t.refs.filter((function(t){return t.isMasterRef}))[0].ref}var c="undefined"==typeof window?global.fetch:window.fetch,u=function(t){function o(e){var n=t.call(this)||this;return n.options=e,n}return e(o,t),o.prototype.request=function(t,e){var o=this.options,u=o.accessToken,s=o.fetch,f=void 0===s?c:s,a=o.repositoryName,p="//"+a+".cdn.prismic.io/api/v2";return new r((function(r){var o;return f(p,{headers:{Accept:"application/json"}}).then((function(t){return t.json()})).then(i).then((function(e){var r=n({"Prismic-Ref":e},t.getContext().headers);return u&&Object.assign(r,{Authentication:u}),r})).then((function(e){return n(n({},t.getContext()),{headers:e})})).then(t.setContext).then((function(){o=e(t).subscribe({next:r.next.bind(r),error:r.error.bind(r),complete:r.complete.bind(r)})})).catch(r.error.bind(r)),function(){var t;return null===(t=o)||void 0===t?void 0:t.unsubscribe()}}))},o}(o);function s(e){var n,r={fetch:e.fetch,uri:(n=e.repositoryName,"//"+n+".cdn.prismic.io/graphql"),useGETForQueries:!0};return new u(e).concat(new t(r))}export{s as PrismicLink};