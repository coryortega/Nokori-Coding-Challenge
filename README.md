# Nokori Coding Challenge

This is an extremely simple API I set up for the Nokori back-end coding challenge. It mocks API's used by companies such as AirBnB and VRBO. The specific home listings used as mock data can be found here:

https://www.vrbo.com/4295070ha 

https://www.airbnb.com/rooms/15904361?source_impression_id=p3_1596226567_MPLXxi3y0o1pA87L

When it comes to testing the endpoints of this API, I used Insomnia but other alternatives such as Postman will work as well. 

****Little things I would change if I had the time:**
- Cut a few functions out that are repeated and seperate them into helper files
- The users object uses username's as a key, that is not ideal and only for convenience
- Change the routing of authorization so it isn't explicitly called on each route
- Only the auth system is currently being unit tested, I would like to include more
- Write better documentation

**Things I plan to do:**
- Set up a PostgreSQL database in lieu of the mock JSON being used
- Create a React frontend that renders this data
- Boom, new portfolio piece

## Setup

Setup for this API is extremely simple, as I tried to keep it as bare-bones as possible.
- Run **npm install** to install all dependencies
- Run **node server.js** to spin up the server. It should default to localhost:3001
- To run unit tests, run **npm test**
> Running the unit tests may generate more users, which will potentially affect future tests

## Technologies used

- **Express** is the Node.js framework used and specified in the challenge documentation
- **jsonwebtoken** was used for authentication, also specified in the challenge documentation
- **Jest/Supertest** is the testing library that was used
- **bcryptjs** is the library used for hashing user passwords

## API Endpoints
### Endpoints for registration and log-in:
- **POST**  localhost:3001 **/register**
	> This endpoint will create a ***unique*** user.

**Expected data:**
```
{
"username": "Test",
"password": "Testing"
}
```
**Return response:**
```
Satus: 201
New user added
```
**Errors:**
```
Status: 409
The username 'example' already exists. Pick another.
```
- **POST**  localhost:3001 **/login**
	> This endpoint will return a JWT to the user if their credentials are verifiable.

**Expected data:**
```
{
"username": "Test",
"password": "Testing"
}
```
**Return response:**
```
Satus: 200
{
  "message": "Welcome back 'example'",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbWVzb24iLCJpYXQiOjE1OTY0OTgwMzIsImV4cCI6MTU5NjUyNjgzMn0.qzaPCPtID-_JJ8Kx2Ym_R_vc9TrsG_c",
  "id": "7"
}
```
**Errors:**
```
Status: 401
Invalid user credentials, unauthorized.
```

### Endpoints regarding home listings:
*****Every endpoint route requires authentication***
*****Register a user, login, and set an 'authorization' header to the token you recieve upon logging in***
- **GET**  localhost:3001 **/homes**
	> This endpoint will return a list of all the home listings in the database.

**Return response:**
```
Satus: 200

{
  "1": {
    "id": 1,
    "title": "Lakeland Village #454 - 4BR + Loft, Walk to Lake, Fun & Convenient!",
    "images": [
      "https://odis.homeaway.com/odis/listing/6d442fb3-19c6-4240-9f73-fe1231cc257c.f10.jpg",
      "https://odis.homeaway.com/odis/listing/b097e65a-e78e-4dea-9c20-6e3ea90ec424.f10.jpg",
      "https://odis.homeaway.com/odis/listing/84c164f0-c31b-444a-a031-6d4989565cef.f10.jpg",
      "https://odis.homeaway.com/odis/listing/2ed1febf-1994-41b6-bdf2-8fe7fdc67b20.f10.jpg"
    ],
    "description": "As you enter onto level 1, you will see bedrooms 1, 2, and 3. Bedroom 1 is the master bedroom with a king-sized bed, HDTV, and full bathroom with a walk-in shower. Bedroom 2 has 1 queen bed and shares the full hall bathroom, which has a shower/tub combination. Bedroom 3 has 2 queen beds and shares the full hall bathroom as well.",
    "bedrooms": 4,
    "bathrooms": 3
  },
  "2": {
    "id": 2,
    "title": "Cabo Center,Ocean view Great price!",
    "images": [
      "https://a0.muscache.com/im/pictures/038932a1-25a3-4140-9b28-0078a72e281a.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/2c34124a-003a-4581-9aff-9318276342da.jpg?im_w=1440",
      "https://www.airbnb.com/rooms/15904361/photos/304625194?source_impression_id=p3_1596226567_MPLXxi3y0o1pA87L"
    ],
    "description": "This is a very cute Palapa suite separate from the main house with ocean view over looking Cabo with patio. All restaurant, bars, beaches are a stone throw away. Located in Cabo's cultural center there is no need for a car. California king bed with ensuite bathroom and shower!",
    "bedrooms": 1,
    "bathrooms": 1
  }
}
```
- **GET**  localhost:3001 **/homes/:id**
	> This endpoint will return the home object of the specified ID that is passed in.

**Return response:**
```
Satus: 200

{
  "1": {
    "id": 1,
    "title": "Lakeland Village #454 - 4BR + Loft, Walk to Lake, Fun & Convenient!",
    "images": [
      "https://odis.homeaway.com/odis/listing/6d442fb3-19c6-4240-9f73-fe1231cc257c.f10.jpg",
      "https://odis.homeaway.com/odis/listing/b097e65a-e78e-4dea-9c20-6e3ea90ec424.f10.jpg",
      "https://odis.homeaway.com/odis/listing/84c164f0-c31b-444a-a031-6d4989565cef.f10.jpg",
      "https://odis.homeaway.com/odis/listing/2ed1febf-1994-41b6-bdf2-8fe7fdc67b20.f10.jpg"
    ],
    "description": "As you enter onto level 1, you will see bedrooms 1, 2, and 3. Bedroom 1 is the master bedroom with a king-sized bed, HDTV, and full bathroom with a walk-in shower. Bedroom 2 has 1 queen bed and shares the full hall bathroom, which has a shower/tub combination. Bedroom 3 has 2 queen beds and shares the full hall bathroom as well.",
    "bedrooms": 4,
    "bathrooms": 3
  }
}
```
- **GET**  localhost:3001 **/homes/:id/images**
	> This endpoint will return a list of images associated with the specified home ID that is passed in.

**Return response:**
```
Satus: 200

[
   "https://odis.homeaway.com/odis/listing/6d442fb3-19c6-4240-9f73-fe1231cc257c.f10.jpg",
   "https://odis.homeaway.com/odis/listing/b097e65a-e78e-4dea-9c20-6e3ea90ec424.f10.jpg",
   "https://odis.homeaway.com/odis/listing/84c164f0-c31b-444a-a031-6d4989565cef.f10.jpg",
   "https://odis.homeaway.com/odis/listing/2ed1febf-1994-41b6-bdf2-8fe7fdc67b20.f10.jpg"
]

```
- **POST**  localhost:3001 **/homes**
	> This endpoint is used to post a new home object/listing.


**Expected data:**
```
{
"title": "Home title goes here",
"description": "Description of home",
"images": [],
"dbedrooms": 4,
"bathrooms": 2
}
```
**Return response:**
```
Satus: 200
New home listing added
```
- **PUT**  localhost:3001 **/homes/:id**
	> This endpoint is used to update the home listing that is associated with the ID passed in.


**Expected data:**
```
{
"title": "Home title goes here",
"description": "Description of home",
"images": [],
"dbedrooms": 4,
"bathrooms": 2
}
```
**Return response:**
```
Satus: 200
home listing with id: 1 has been updated
```
**Errors:**
```
Status: 404
No home listing with id: 1 found
```
- **DEL**  localhost:3001 **/homes/:id**
	> This endpoint is used to delete the home object related to the ID passed in.

**Return response:**
```
Satus: 200
home listing with id: 1 has been deleted
```
**Errors:**
```
Status: 404
No home listing with id: 1 found
```
### Endpoints regarding users:
*****Every endpoint route requires authentication***
*****Register a user, login, and set an 'authorization' header to the token you recieve upon logging in***
- **GET**  localhost:3001 **/users**
	> This endpoint is used to return a list of every user in the database.

**Return response:**
```
Satus: 200
{
  "testing": {
    "username": "testing",
    "password": "$2a$12$f4FU1w6hMCooyon1dB7hg.N78EvIwcScfJcxKdBF1BWzYplnB8POy",
    "userId": 1
  },
  "testing123": {
    "username": "testing123",
    "password": "$2a$12$wxk1Znzln2xI6E.6EZ9efOfdy2ksaDwZR6Ik5U48AUAf5smTD8P3O",
    "userId": 2
  }
}
```
- **DEL**  localhost:3001 **/users/username**
	> This endpoint is used to delete the user with the associated username that is passed in.

**Return response:**
```
Satus: 200
User with id: 1 removed
```
**Errors:**
```
Satus: 201
No user with id: 1 found
```



