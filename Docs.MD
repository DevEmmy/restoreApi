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
- PATCH: "/users/"
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
