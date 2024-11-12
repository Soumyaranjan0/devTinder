# devTinder APIs

## authRouter
- post /signup
- post /login
- post /logout

## profileRouter
-get /profile/view
-get /profile/edit
-get /profile/password

## connectionRequestRouter
-post /request/send/intrested/:userId
-post /request/send/ignored/:userId
-post /request/review/accepted/:requestId
-post /request/review/rejected/:requestId

## userRouter
-get /user/connections
-get /user/requests/received
-get /user/feed -gets you the profiles of other users on platform

status-ignored,intrested,accepted,rejected
