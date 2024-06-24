Name: Rene Ayers
Title: Rocket_Elevators_Express
https://github.com/rayers1998/Rocket_Elevators_Express.git
User Github: rayers1998
Module 4 - Back End Development 1

--------------------------------------------------------------------------

## Rocket Elevators Project Documentation
-- A README file on GitHub is like an introduction page for a project.
-- It explains what the project is about, how to use it, and any other important information someone might need to know. 
-- It's used to help people understand the purpose of the project, how to install or run it, and where to find more information if they need help. 
-- Think of it as a guidebook or instruction manual for the project.

## Rocket Elevators Background
-- Rocket Elevators is a company that installs, constructs, and maintains elevators for homes, businesses, and industrial buildings. 
-- Our website features a full range of elevator products designed for different types of buildings. 
-- We also offer a contact form for potential clients to discuss their specific projects with us.
-- This focus on customer service emphasizes the importance of having a strong and efficient system to manage requests and projects effectively.

### What is Node.js?
-- Node.js a run-time environment (RTE) that acts as an engine to power web applications.
-------- When you write JavaScript code in a text editor, that code cannot perform any task unless you execute (or run) it. And to run the code, a runtime environment is needed. 
-- Node.js is a run-time environment outside of the browser (ex: Google Chrome, Mozilla Firefox, Safari, Opera ....).
-- Because node.js is outside the browser it's possible to build back-end applications using Javascript. 
-- Node.js is a free source of code that's available for public use. 
-- With Node.js most of the code is already written to work with.
-- It's not dependent on any operating system software. It can work on Linux, macOS, or Windows.


### What is Express?
-- Express:
    - a framework built on top of Node.js to structure and simplify the development process.
    - is given a powerful advantage because it's built on top of Node which has most of the code already written to work with.
    - is used for designing and building web applications and API’s quickly and easily.
    - ultimately, helps to organize web applications on the server side into a more organized MVC architecture (MODEL-VIEW-CONTROLLER architecture).

### Why use Express?
-- Express:
    - is easy for people to read and write.
    - is easy for computers to parse (analyze and breakdown structured data,    like text or code, into individual components to understand or process it) and generate.
    - requires only Javascript, a widely used language, and is supported everywhere.
    - helps build different applications and API’s in a short period of time.
    - provides simple routing for requests made by the clients. 
    - provides middleware that’s responsible for making decisions to give the correct responses to the requests made by the client.


#### What is middleware?
-- Middleware is like a series of helpers that process requests as they come into a web server. 
-- Each step (middleware function) can pass the request to the next step, modify it, or end the process by sending a response back to the customer.
-- This organized way of handling requests makes the server efficient and flexible.


#### Wat is a ROUTE?
 -- Route: a specific endpoint defined in the application where certain logic is executed when a request is received. This endpoint is associated with a particular HTTP method (GET, POST, PUT, DELETE, etc.).


 #### Postman Methods (all on HTTP)
        - POST request sends data to a server to create or update a resource.     
            - a POST route is one that handles HTTP POST request.
        - GET request gets data from another computer.
            - using an HTTP method (loading a website is a GET request) is a GET request.
        - PUT method is used to create or replace a resource on the server.
            - it's similiar to a post resquest but it's IDEMPOTENT, which means making multiple PUT requests will have the same effect as making a single PUT request.
        - DELETE method is used to remove a specified resource from the server.
        - PATCH method modifies or makes partial updates to a resource on the server. Allows for more efficient updates.
        - HEAD method is used to retrieve the headers of a resource without fetching the actual content.
        - OPTIONS method requests information about the available communication options for a resource or server. 
            - the server responds with the allowed methods (e.g., GET, POST, PUT, DELETE) and other supported capabilities, helping you understand what actions can be performed on the resource before making a specific request.


    

#### CRUD Operatons (CREATE, READ, UPDATE, DELETE)
-- CRUD operations are the 4 basic operations or fundamental tasks for handling data in a database or storage system. 
    - CREATE is the POST request to send data to a server to create or update a resource. 
    - READ is the GET request to retrieve data or resources.
    - UPDATE is the PUT or PATCH method. PUT replaces the entire resource. PATCH updates specific parts of the resource.
    - DELETE request removes an existing resource or data from the system. 


#### Error Types
-- Informational Responses (100-199)
    - 100 (Continue) - server acknowledges a request
    - 101 (Switching Protocols) - protocol switch requested and accepted

-- Successful Responses (200-299)
    - 200 (OK) - request succeeded
    - 201 (Created) - new resource created
    - 204 (No Content) - request succeeded, no content returned

-- Redirection Messsages (300-399)
    - 301 (Moved Permanently) - resource permanently moved
    - 302 (Found) - resource temporarily moved
    - 304 - (Not Modified) - No need to retransmit

-- Client Error Response (400-499)
    - 400 (Bad Request) - client error, cannot process request
    - 401 (Unauthorized) - authentication required
    - 403 (Forbidden) - request understood, but refused
    - 404 (Not Found) - resource not found

-- Server Error Responses (500-599)
    - 500 (Internal Server Error) - unexpected server error
    - 501 (Not Implemented) - server cannot fulfill request method
    - 502 (Bad Gateway) - invalid response from upstream server
    - 503 (Service Undeniable) - server temporarily overloaded or down
    - 504 (Gateway Timeout) - no timely reponse from upstream server