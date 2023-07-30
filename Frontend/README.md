# ***Frontend Implementation.***

This is the Frontend of our website FlavorFusion.<br>
We implemented the frontend using: Vue.js, javascript, html and css.<br><br>

<img src="https://github.com/devicons/devicon/blob/master/icons/vuejs/vuejs-original.svg" title="Vuejs" alt="Vuejs" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg" title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
<br><br>

## Installation

1. After downloading and extracting the ZIP file, open a terminal for Frontend folder and run `npm install` to install all the required dependencies.
2. The website is configured to run locally, on your local computer.
3. If you want to expose the website to the internet you have to own a server or a machine that is also exposed to the internet, and then I will guide you how to modify the code to be compatible to run on the internet.<br><br><br>



## Configuration
<u>***Note:***</u> escape these steps if you want to run it on your local computer.<br>

Now we have 3 files to modify:
1. Go to [vue.config.js](https://github.com/eliyaballout/Recipes-Website---Full-Stack-Project/blob/main/Frontend/vue.config.js):
   * Put line 7 in a comment.
   * Uncomment line 6, replace the string `"YOUR_DOMAIN //example.com"` with your domain name, and save it. <br><br>

2. Go to [store.js](https://github.com/eliyaballout/Recipes-Website---Full-Stack-Project/blob/main/Frontend/src/store.js):
   * Put line 3 in a comment.
   * Uncomment line 4, replace the string `"https://MACHINE_IP"` with your machine or server IP, **make sure that it stays with https in the beginning**, and save it. <br><br>

3. Go to [main.js](https://github.com/eliyaballout/Recipes-Website---Full-Stack-Project/blob/main/Frontend/src/main.js):
   * Put line 82 in a comment.
   * Uncomment line 83, replace the string `"https://YOUR_DOMAIN"` with your domain name, **make sure that it stays with https in the beginning**, and save it. <br><br><br>



## Running
### Run the website locally or remotely:
After you have installed the required dependencies as we discussed above, and configred the code to be exposed to the internet if you choose this. <br>
Now we will run the frontend, in the same terminal that you have openned for the frontend, using these two commands:<br>
<u>***Note:***</u> You must leave the terminal open and running.<br>

```
npm run build
npm run serve
```