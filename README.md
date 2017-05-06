# Fashion_cloud
#Project for Fashion cloud assignment
1. Server.js file contain all the rest API for problems....
2. Config.js file contain the logic to get the instance of mongodb, please modify the file is credential is required 
3. Endpoint.js file contain all the implemenation of rest + DB connection, this file need to modify if mongo db connection require
4. On starting server it will try to get the existing mongodb instance else will try to create on localhost.
5. Collection ‘fashion’ is created with TTL index for 60*20 means data can be automatically purged after these times. (Solution for TTL)
6. There is Cap limit of 10 means if user push more then this limit it will automatically purge the last modified  record based on time and add the new data.(Solution for cache limitation)
7. Get/Add/Update API will check if data exist in the Database if not will insert else update the timestamp only. It will depend on 3 step above also.
8. Remove/Remove All will  remove the record/records respectively from the database.

Get(GET method):
/getendpoint/:id
Ex:    curl -i -X GET http://localhost:3000/getendpoint/32.
GetAll(GET method):
/ getAllendpoint
Ex:    curl -i -X GET http://localhost:3000/ getAllendpoint .

Add(POST method):
/ endpoint
Ex:    curl -i -X POST -H 'Content-Type: application/json' -d '{"key": 9993}' http://localhost:3000/endpoint

Update(PUT method):
/endpoint/:id
Ex:    curl -i -X PUT -H 'Content-Type: application/json' -d '{"key": 9993}' http://localhost:3000/endpoint
.
Remove(DELETE method):
/ deleteendpoint/:id
Ex:    curl -i -X DELETE http://localhost:3000/deleteendpoint/32 .

RemoveAll(DELETE method):
/ deleteAllendpoints
Ex:    curl -i -X DELETE http://localhost:3000/deleteAllendpoints 


