TO RUN PROGRAM:

*server created by Nathan Olivieri 21/05/2019
- Node.JS server. *user must have node.js installed to run
- User must have instance of MongoDB running on pc called mongodb://localhost/hatchdb 
from MONGO CLI :
    - create hatchdb by entering command: use hatchdb

- to start server, run command: node index.js
- to test server, run command: npm test (tests must include existing ids to pass)

Things this server still needs

- tests work perfectly when given real ids however this actually performs CRUD operations on the database so in the uture I would make the test server run it's own instance of mongoDB, control the environment with Env variables and have the tests create their own workers and orders then perform all tests. THis way the ive database wuold not be affected.

- customized error reponses with instructions. As seen in my /put route but for every route. Currently only default errors are returned. helpfull but not pretty.

-app tested with postman. 