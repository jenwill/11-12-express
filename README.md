Lab 11: Single Resource Express API
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


*  To create a new bird resource:
```
POST /api/v1/bird 
```
 
 This will return a JSON object including a newly-generated id which can be used to retrieve that resource.
 
 
 * To retrieve an array of all stored resources: 
 ```
 http GET :3000/api/v1/bird
 ```
 
 
* To retrieve a resource by id, for example if id is '1234-5678':
```
http GET :3000/api/v1/bird?id=1234-5678
```


* To delete a resource by id, for example if id is '1234-5678':
```
http DELETE :3000/api/v1/bird?id=1234-5678
```
This will return with status code 204 and no message. 
