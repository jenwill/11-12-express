Lab 12: Single Resource Express API
======

**Author:** Jennifer Piper

This is a very simple REST API, to store and retrieve info about birds. It will store in the file system: name, type, habitat, and info for each item.
## Getting Started
In a node.js environment, from the root of this repo, install dependencies:
* `npm i`
Start the database server: 
* `npm run dbon`
And run tests (this starts the Node server before the tests, and stops it after the tests):
* `npm run test`

To turn off the database server: 
* `npm run dboff`

## API Endpoints
POST /api/<resource-name>
pass data as stringifed JSON in the body of a POST request to create a new resource
on success respond with a 200 status code and the created note
on failure due to a bad request send a 400 status code
GET /api/<resource-name> and GET /api/<resource-name>/:id
with no id in the query string it should respond with an array of all of your resources
with an id in the query string it should respond with the details of a specifc resource (as JSON)
if the id is not found respond with a 404
DELETE /api/<resource-name>/:id
the route should delete a note with the given id
on success this should return a 204 status code with no content in the body
on failure due to lack of id in the query respond with a 400 status code
on failure due to a resouce with that id not existing respond with a 404 status code


*  POST /api/v1/bird 
 
 This will return a JSON object including a newly-generated id which can be used to retrieve that resource.
 
 
 * To retrieve an array of all stored resource ids: 

 GET /api/v1/bird/ids

 
 
* To retrieve a resource by id, for example if id is '1234-5678':

 GET /api/v1/bird?id=1234-5678



* To delete a resource by id, for example if id is '1234-5678':
DELETE /api/v1/bird?id=1234-5678

This will return with status code 204 and no message. 
