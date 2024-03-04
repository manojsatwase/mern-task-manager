
-------- register user --------
POST REQUEST FOR RESISTRATION USER
{{URL}}/api/users

body => 
{
    "name":"ranu",
    "email":"ranu@gmail.com",
    "password":"ranu@123"
}

--------------------------------------------

POST REQUEST FOR login user
{{URL}}/api/users/login

body => 
{
    "email":"manoj@gmail.com",
    "password":"manoj@123"
}

RESPONSE =>

{
    "_id": "65d785d62984462c96b289e2",
    "name": "manoj",
    "email": "manoj@gmail.com",
    "password": "$2a$10$cU8G5uZGqqOr8WVTH/5XbOxr3pYi8KKX2VnvvlGUyMu79lse1iYRW",
    "isAdmin": false,
    "pic": "manoj",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDc4NWQ2Mjk4NDQ2MmM5NmIyODllMiIsImlhdCI6MTcwOTEzMDg3MSwiZXhwIjoxNzA5MjE3MjcxfQ.iDhjO-xXTsle6XhghWNw4nLKseONdY_Tzmvi7jHGyvg"
}



------ CRUD NOTE ------------
 this is protected route so select Authorization => Bearer Token => login & copy token and pass that token 

POST REQUEST 
{{URL}}/api/tasks/create
body => 
{
    "title":"My First Note",
    "content":"hello world!",
    "category":"myslef"
}

RESPONSE =>

{
    "title": "My First Note",
    "content": "hello world!",
    "category": "myslef",
    "user": "65d785d62984462c96b289e2",
    "_id": "65df52fd2a2b46d64f3f6028",
    "createdAt": "2024-02-28T15:36:29.164Z",
    "updatedAt": "2024-02-28T15:36:29.164Z",
    "__v": 0
}

-------------------------------------------

GET REQUEST FOR All tasks
{{URL}}/api/tasks

RESPONSE => 
[
    {
        "_id": "65df52fd2a2b46d64f3f6028",
        "title": "My First Note",
        "content": "hello world!",
        "category": "myslef",
        "user": "65d785d62984462c96b289e2",
        "createdAt": "2024-02-28T15:36:29.164Z",
        "updatedAt": "2024-02-28T15:36:29.164Z",
        "__v": 0
    },
    {
        "_id": "65df5610a7e4598559c7b1aa",
        "title": "My Second Note",
        "content": "hello world!",
        "category": "myslef",
        "user": "65d785d62984462c96b289e2",
        "createdAt": "2024-02-28T15:49:36.020Z",
        "updatedAt": "2024-02-28T15:49:36.020Z",
        "__v": 0
    }
]

---------------------------------------------------

GET REQUEST FOR SINGLE tasks
{{URL}}/api/tasks/:id
example {{URL}}/api/tasks/65df52fd2a2b46d64f3f6028

RESPONSE => 

{
    "_id": "65df52fd2a2b46d64f3f6028",
    "title": "My First Note",
    "content": "hello world!",
    "category": "myslef",
    "user": "65d785d62984462c96b289e2",
    "createdAt": "2024-02-28T15:36:29.164Z",
    "updatedAt": "2024-02-28T15:36:29.164Z",
    "__v": 0
}

{{URL}}/api/tasks/65df5610a7e4598559c7b1aa

RESPONSE => 
{
    "_id": "65df5610a7e4598559c7b1aa",
    "title": "My Second Note",
    "content": "hello world!",
    "category": "myslef",
    "user": "65d785d62984462c96b289e2",
    "createdAt": "2024-02-28T15:49:36.020Z",
    "updatedAt": "2024-02-28T15:49:36.020Z",
    "__v": 0
}

------------------------------------------------

Update Note
PUT REQUEST
{{URL}}/api/tasks/65df5610a7e4598559c7b1aa

BODY => 
{
    "title": "My Second Note",
    "content": "today task is complited",
    "category": "myslef"
}

RESPONSE => 

{
    "_id": "65df5610a7e4598559c7b1aa",
    "title": "My Second Note",
    "content": "today task is complited",
    "category": "myslef",
    "user": "65d785d62984462c96b289e2",
    "createdAt": "2024-02-28T15:49:36.020Z",
    "updatedAt": "2024-02-28T17:23:02.108Z",
    "__v": 0
}

------------------------------------------
delete note
DELETE REQUEST
{{URL}}/api/tasks/65df5610a7e4598559c7b1aa 
 this is protected route so select Authorization => Bearer Token => login & copy token and pass that token 

 --------------------------------------------
