/**
* Source taken from https://github.com/ericf/express-slash/blob/master/index.js
* Rewritten for koa
*/

'use strict';

var parseURL = require('url').parse;

var KoaSlash = function *(statusCode) {
  // Force a permanent redirect, unless otherwise specified.
  statusCode || (statusCode = 301);

  return function *(next) {
    var req = this.request, res = this.response;
    var method = req.method.toLowerCase(),
        hasSlash, match, pathname, routes, search, url;

    // Skip when the request is neither a GET or HEAD.
    if (!(method === 'get' || method === 'head')) {
        yield next;
    }

    routes = this.app.routes[method];

    // Skip when no routes for the request method.
    if (!routes) {
        yield next;
    }

    url      = parseURL(req.url);
    pathname = url.pathname;
    search   = url.search || '';
    hasSlash = pathname.charAt(pathname.length - 1) === '/';

    // Adjust the URL's path by either adding or removing a trailing slash.
    pathname = hasSlash ? pathname.slice(0, -1) : (pathname + '/');

    // Look for matching route.
    match = routes.some(function (r) {
        return r.match(pathname);
    });

    if (match) {
        this.status = statusCode;
        res.redirect(pathname + search);
    } else {
        yield next;
    }
  };
};

module.exports = KoaSlash;
