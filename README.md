# Social Network API
The server side portion of social network API created using MongoDB and mongoose

## Description
This is a basic backend API setup for a social network. It is made up of 2 MongoDB Schemas one for Users and one for Thoughts.

The User Schema contains arrays that house the Id's of thoughts and friends and a virtual field to hold the friend count.

The Thought Schema contains an array which references the Reaction Schema and holds the Id's of any reactions to a thought along with a virtual field for a reaction count. The Reaction Schema is a part of the Thought Schema.

There are API routes for: 
* Viewing all users and posts
* Viewing a single user or post by the Id #
* Adding new users, follow, posts and likes
* Updating user data and thoughts
* Deleting users, unfollow, posts and likes

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Technologies](#Technologies)
* [Preview](#Preview)

## Installation
This is strictly backend code so the repository needs to be copied and then the necessary packages installed by running the `npm i` command.

You must have MongoDB installed for the app to function.

## Usage
Server can be started by using the `npm start` command. Routes can be tested by using programs like Insomnia or Postman.

## Preview
<img width="1272" alt="User Registration" src="https://user-images.githubusercontent.com/113862737/224375249-594cb33a-89e2-488f-b41c-88ce0ba1201e.png">
<img width="1273" alt="User Login" src="https://user-images.githubusercontent.com/113862737/224375304-d21cd34a-7d0a-4975-a3b3-1c2b267dc603.png">
<img width="1273" alt="User Update" src="https://user-images.githubusercontent.com/113862737/224375360-deb09fe1-4399-4a5b-b18c-abe4b00e22c8.png">
<img width="1278" alt="Create Post" src="https://user-images.githubusercontent.com/113862737/224375381-d683d540-7d69-41af-864a-9fea5b7ab281.png">
<img width="1282" alt="Delete User" src="https://user-images.githubusercontent.com/113862737/224375404-7f5dc8b4-0248-4d51-902d-ccb017be98bb.png">
<img width="1276" alt="Follow User" src="https://user-images.githubusercontent.com/113862737/224375451-5ca25191-827d-4670-8030-d6cd785ac8a6.png">
<img width="1278" alt="View Timeline" src="https://user-images.githubusercontent.com/113862737/224375493-885fe417-e60a-4c21-8e34-b6fdbced061a.png">

### Demo Video Link
