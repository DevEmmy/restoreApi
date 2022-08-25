# API Docs

To sign up
- POST: "/users/signup"
### Parameters
- email
- password

To sign in
- POST: "/users/signin"
### Parameters
- email
- password

To upload a document
- POST: "/documents/"
### Parameters
- document
- title
- filter

To get documents
- GET: "/documents"

To update profile
- PUT: "/users/update-profile"

- To sign up as an admin
- POST: "/signupAsAdmin/"
### Parameters
- firstName
- lastName
- matricNumber
- level
- college
- department
- telephone

To get User
- GET: "/users/user"

To get all users
- GET: "/users/all-users"

# Note: 
All while sending an end point request, make sure you're passing Authorization header.


Okay, to get some things straight. While making requests for authorized users, ensure you're passing thier token as headers to the api call, else nothing will be returned.