Lab 12: Express Middleware
======

**Author:** Jennifer Piper

This is a very simple REST API, to store and retrieve info about birds. With help from Mongoose and Express, it will store name, type, habitat, and info for each item.
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


* To create a new bird resource:

  POST /api/v1/bird name=birdname type=birdtype info='extra info about this bird'
 
 This will return a JSON object including a newly-generated id which can be used to retrieve that resource.
 
 
 * To retrieve a resource by id, for example if id is '1234-5678':

    GET /api/v1/bird/1234-5678
    
 * To delete a resource by id, for example if id is '1234-5678':
  
    DELETE /api/v1/bird/1234-5678
 