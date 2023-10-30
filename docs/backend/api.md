#  API Documentation

## Contents

1. <a href="#general_info">General info</a>
2. <a href="#endpoints">Endpoints</a>
   - <a href="#ep_user_register">/user/register</a>
   - <a href="#ep_user_login">/user/login</a>
   - <a href="#ep_user">/user</a>
   - <a href="ep_user_par_username">/user?username="&lt;username&gt;"</a>
   - <a href="#ep_posts">/posts</a>
   - <a href="#ep_posts_comment">/posts/comment</a>
   - <a href="#ep_posts_image">/posts/image</a>
   - <a href="#ep_posts_video">/posts/video</a>

## <div id="general_info">General info</div>
The server should authenticate users on their login. Endpoints' methods, that require authentication have the ```Authentication required``` marker in their description.


## <div id="endpoints">Endpoints</div>

### <div id="ep_user_register">/user/register</div>
Used to register user on the website. Users should not get authenticated at this point, they will be after succesfull login.
#### Handled methods
 - **PUT**
   - Headers:
     - username (required)
     - email (required)
     - password (required) - encrypted with BCrypt
   - Body:
     - empty
   - Response:
     - 201 - Created - successful creation of user 
     - 409 - Conflict - user already exists
     - 400 - Bad Request - any other scenario ie. request was missing header or body element

### <div id="ep_user_login">/user/login</div>
Used to login users on the website. After succesfull login, the user should be authenticated on the server.
#### Handled methods
 - **POST**
   - Headers:
     - username (required)
     - password (required) - encrypted with BCrypt
   - Body:
     - empty
   - Response:
     - 200 - Ok - succesfull login
     - 401 - Unauthorized - invalid credentials
     - 400 - Bad Request - any other scenario

### <div id="ep_user">/user</div>
Used to retreive and update user information from the website.
#### Handled methods
 - **GET**
   - Headers:
     - empty
   - Body:
     - empty
   - Response:
     - 200 - Ok
       - JSON Body:
         - username
         - email
     - 400 - Bad Request - any scenario, when user is not logged in
 - **POST**</br>
   ```Authentication required```</br>
   Used to alter the logged user data.
   - Headers:
     - empty
   - Body:
     - username (optional)
     - first_name (optional)
     - last_name (optional)
     - email (optional)
     - profile_photo (optional)
     - old_password (required) - encypted with BCrypt
     - new_password (optional) - encypted with BCrypt
   - Response:
     - 200 - Ok - succesfully updated
     - 400 - Bad Request - any scenario, when user is not logged in

### <div id="ep_user_par_username">/user?username="&lt;username&gt;"</div>
Used to retreive other users information. Could be used to retreive current user information, but please you /user endpoint for that purpose.</br>
**&lt;username&gt;** - username of requested user
#### Handled methods
 - **GET**
   - Headers:
     - empty
   - Body:
     - empty
   - Response
     - 200 - Ok - user found
       - JSON Body:
         - username
         - first_name - might be empty
         - last_name - might be empty
         - email
         - profile_photo
     - 404 - Not found - user not found

### <div id="ep_posts">/posts</div>
Used to post, retreive and delete posts by the user.
#### Handled methods
 - **GET**
   - Headers:
     - empty
   - Body:
     - location (optional) - if empty get posts for the main page, if not empty, it should contain a username, whoose posts are requested
   - Response:
     - 200 - Ok
       - JSON Body:</br>
         It should contain list of objects, which are the requested posts</br>
         Single post structure
         - id - id of the post
         - author_username - author of the post
         - author_first_name
         - author_last_name
         - text_content - text content of the post
         - image_content_ids - list of objects, list of properly formed ids of photos
         - video_content_ids - list of objects, list of properly formed ids of videos
     - 400 - Bad Request - requested location doesn't exist
 - **POST**</br>
   ```Authentication required```
   - Headers:
     - empty
   - Body:</br>
     If the id is not empty and the location has changed, the server should return 400 - Bad Request.
     - id (optional) - empty if this post is new
     - location (optional) - empty if user wants to post on main page
     - text_content (required)
     - image_content (optional) - list of objects
       - Single object structure:</br>
         **Single object should not contain both the id and content. Server should verify this.**</br>
         If the id is present in the request, that image should be deleted.
         - id (optional) - id of the image if the image already exists
         - content (optional) - image if does not already exist
     - video_content (optional) - list of objects
       - Single object structure:</br>
         **Single object should not contain both the id and content. Server should verify this.**</br>
         If the id is present in the request, that video should be deleted.
         - id (optional) - id of the video if the video already exists
         - content (optional) - video if does not already exist
   - Response:
     - 201 - Created - post was successfully created or updated
       - Headers:
         - Location (Standard header) - the URL, under which the post could be retreived
     - 400 - Bad Request - data was invalid
       - JSON Body:
         - error_description - message describing why the data was invalid, in case of unauthenticated user it is empty
 - **DELETE**</br>
   ```Authentication required```
   - Headers:
     - empty
   - Body:
     - id (required) - id of the post to delete
   - Response
     - 204 - No Content - successfully deleted the post
     - 400 - Bad Request - the id doesn't match any post id, or client is not the author

### <div id="#ep_posts_comment">/posts/comment</div>
Used to retreive comments connected to the post
#### Handled methods
### <div id="#ep_posts_image">/posts/image</div>
Used to retreive comments connected to the post
#### Handled methods
### <div id="#ep_posts_video">/posts/video</div>
Used to retreive comments connected to the post
#### Handled methods
