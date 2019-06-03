TO RUN PROGRAM:

*server created by Nathan Olivieri 21/05/2019
- Node.JS server. 
*user must have node.js installed to run
*User must have instance of MongoDB running on pc called mongodb://localhost/hatchdb 

- to start server, run command: node index.js
- to test server, run command: npm test (tests must include existing ids to pass)

The endpoints are as follows:

    /workers
        GET - Returns JSON array of all workers currently in the database.
        POST - Adds new worker to database (http req body must contain an object {name: String, company: String,            email: String}) & headers set to content-type:application/json.

    /orders
        GET - Returns JSON aray of all orders currently int he database.
        POST - Adds new order to database (http req body must contain an object {title: String, description: String,        deadline: String}) **Date must be valid UTC** headers set to content-type:application/json.

    /workers/:id 
        DELETE - Deletes the user by the ID in url. Must be valid ID
    
    /workers/:id/orders
        GET - Returns all orders for worker ID in url sorted by deadline.

    /addWorker/:worker_id/toOrder/:order_id
        PUT - Updates "assignedWorker" array in order by ORDER_ID in url to include worker obj found by WORKER_ID in url
