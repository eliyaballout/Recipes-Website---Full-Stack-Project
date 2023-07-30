# ***Backend Implementation.***

This is the Backend of our website FlavorFusion.<br> 
We used an external food Api - Spoonacular API. to get recipes and information about them.<br>
Also we build a database to store some other recipes, and other things.<br>
We implemented the frontend using: Node.js, MySQL, html and css.<br><br>

<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original-wordmark.svg" title="MySQL"  alt="MySQL" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg" title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
<br><br>



## Installation

1. After downloading and extracting the ZIP file, open a separate terminal for Backend folder and run `npm install` to install all the required dependencies.
2. The website is configured to run locally, on your local computer. Additional to this, the database is also configured to work locally.
3. If you want to expose the website to the internet you have to own a server or a machine that is also exposed to the internet, and then I will guide you how to modify the code to be compatible to run on the internet.<br><br>



## Setting up your `.env` file
In order to run the Backend either locally or remotely, you have to add `.env` fileto Backend folder:<br>
* Create a new file name it `.env`.
* Copy and paste this code to the file:
    ```
    host = localhost
    user = root
    MySQLPassword = YOUR_DB_PASS
    MySQLDBName = mydb
    spooncular_apiKey = YOUR_API_KEY
    ```
* In `MySQLPassword` field, add your DB password.
* In `spooncular_apiKey` field, add your spoonacular API key. **In order to get spoonacular API, just go to [Spoonaclar website](https://spoonacular.com/food-api), and sign up.** <br><br>



## Configuration
<u>***Note:***</u> escape these steps if you want to run it on your local computer.<br>

Now we have 1 files to modify:
1. Go to [main.js](https://github.com/eliyaballout/Recipes-Website---Full-Stack-Project/blob/main/Backend/main.js):
   * Put line 27 and 29 in a comment.
   * Uncomment line 31 and 35.
   * Change the port number from 3000 to 80 in line 52.
   * Put the lines 92 to 101 in a comment.
   * Uncomment line 104. <br><br>


In order to expose the website to the internet and configure it to work over https with SSL you need a certificate, and to add the public and private key to the backend folder using these to files to add:
```
fullchain.pem
privkey.pem
``` 
<br><br>


## Running
### Run the website locally:
After you have installed the required dependencies and setup the `.env` as we discussed above. <br>
Now we will run the backend, in the same terminal that you have openned for the backend, using this command:<br>
<u>***Note:***</u> You must leave the terminal open and running.<br>
```
npm start
```
<br>


### Run the website remotely:
After you have installed the required dependencies and setup the `.env` as we discussed above, and configred the code to be exposed to the internet if you choose this. <br>
Now we will run the backend, in the same terminal that you have openned for the backend, using this command:<br>
<u>***Note:***</u> You must leave the terminal open and running.<br>
```
npm server
```