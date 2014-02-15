# DozerJS

<img align="right" src="logo.png">

Dozer is a system for rapidly developing services to support front-end applications.

It's not a framework, not a toolkit, rather Dozer aims to be a maleable and
unopinionated foundation for developing RESTful API's and web services to support
front-end development.

Dozer creates a core server environment using [NodeJS](http://www.nodejs.org) and
the [Express framework](http://expressjs.com) then allows you to build api endpoints,
database models, components and adapters which all work together to provide the
services required on the front-end.

## Core

The core of Dozer is the [Express](http://expressjs.com/) setup which sets a
number of common configuration properties, handles RESTful API endpoints and
serves static files. It then reads in the application configuration, loads any
adapters, components & controllers, and chains everything together.

## Components

Components are simply modules which are loaded and available throughout the application.
The can be database modules, express middleware or anything else required by the
application or any of the controllers.

## Adapters

Similar to components adapters are modules which connect internally. Specifically
things like database adapters, sockets, etc.

## API

The API files establish the RESTful endpoints to which your server will respond.
They are objects where the top-level methods correspond with the HTTP verbs that
the endpoint will support (`GET`, `POST`, `PUT`, `DELETE`, etc).

## Controllers

The controllers are the engine for the server. Everything ultimately ends up in
a controller to be processed. This includes database interactions, sockets,
custom adapter usage, remote API procedures, etc. Controllers can be initialized
up front to provide services throughout or can be built to simply cater to the
needs of the API.

## Models

Models represent the data. Each store/table in the database should have a model
associated with it. The models outline the structure and content-types of the
data. Models can be automatically validated in the controller with a number of
supported data-types, all of which are customizeable and easily maintained in the
core configuration.

## View/Public

Dozer builds a server solution for developing front-end applications which interact
with API's, sockets and whatever else is provided by the server. On startup Dozer
builds a static server instance through the `public` directory which serves all
assets used by the application.

---

# Getting Started

**Quick Start**

DozerJS has an [npm available](https://www.npmjs.org/package/dozerjs) to make
creating new instances simple. To get started install the npm globally:

`npm install dozerjs -g`

Then simply run the `dozerjs` npm via the following:

`dozerjs create NewProject`

Which will create the project with all neccesary assets and dependencies in the
directory `./NewProject`.

---

**Manual Installation**

To get the foundation up and running simply clone it locally then run `npm install`
to install the dependencies.

---

Dozer is configured to run out of the box on any setup, so you can run it via
`node index.js` in the root which will start the service.

### Static Web (View)

The default port is `8181` so navigating to `http://yourserver.com:8181` will load
the static `index.html` from the `/public/src` directory.

### API

The default build comes with a complete set of `/api/users` endpoints which are
fully functional and are stored in an NeDB instance. The breakdown of files is:

* `/models/users.js` - The model and data representation
* `/api/users.js` - The API object associating HTTP verbs to the controller
* `/controllers/users.js` - The controller that handles API requests

The `model` and `api` files are both fairly simple, setting up the configuration
which Dozer uses to accurately respond to requests and interact with the controller.

The `controller` file has a number of methods which correspond to the verbs in the
`api` file.

**API Examples:**

`GET`:`http://yourserver.com:8181/api/users/`

Returns all the users in the data store or empty array

`GET`:`http://yourserver.com:8181/api/users/{ID}`

Returns a specific user based on the `{ID}` or empty array

`POST`:`http://youserver.com:8181/api/user/`

When requested with payload of key-values matching the model will create a new
user record

`PUT`:`http://yourserver.com:8181/api/users/{ID}`

When requested with payload of key-values matching the model will update a user
record with matching `{ID}`

`DELETE`:`http://yourserver.com:8181/api/users/{ID}`

Will delete the user record with matching `{ID}`
