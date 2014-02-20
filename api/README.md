# How to use this folder and the files inside it

This folder is used to hold the API 'routes'. Each file represents a group of routes under a common namespace (or entity), if you will. For Example, 'users.js' houses all routes that pertain to verbs regarding a User. In the file you will see an array of object arrays, that are keyed to HTTP verbs. Under each of those is one or more routes.

## HTTP Verbs

GET, POST, PUT, and DELETE are the normal supported HTTP verbs found in most browsers, though be aware of the browsers your app is going to support as not all verbs are supported by all browsers. In general, GET and POST are the most supported.

## Objects and Arrays

Each HTTP verb inside your api route file can either be an [Object] or [object Array].

## Naming Conventions

Take care when determining what name you give your api route files. The file name here coincides with a matching Controller file and possibly a Model file, if business logic is needed for the entity.