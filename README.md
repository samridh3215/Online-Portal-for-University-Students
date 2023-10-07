# Portal for university students

## STEPS TO BE A GOOD COLLABORATOR

- Fork this repository to your account 
- go to your account and look for this repository and CLONE the repository using
` git clone  <url>`
- cd into cloned directory and create a new branch  and switch to it  
`git checkout -b <branch name>` branch name should be unique, preferably  your name
- **All your changes must be pushed to this branch only** 

## Guidelines
> Use node 18.17.1
 - Not compulsory but would recommend using linux (https://ubuntu.com/wsl, dont have to get VM for this), it will make things easier 
 - Divide the code into files and don't create all your functions in one file, modularity is a good practice 
 - If there are any settings that are subject to change, all these settings should be in a config.json file and read from it rather than using hardcoded values in the code
 - Same goes for CSS and styling, we will be using fonts (style, family and size) and colors (primary, secondary) that are global to the project, and hence will be stored in variables, easy to chage stuff later
 - Don't make changed to other people's code unless abolutely necessary 
 - This project will use EJS templating and hence I repeat again **keep the code modular**
 - Create files and directories based on the following project structure
```
.
├── config
│   └── .env
|   └── config.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── feature1_route.js
│   └── feature2_route.js
├── src
│   ├── feature1
│   └── feature2
└── static
    ├── css
    ├── media
    └── templates
```


**MORE GUIDELINES SOON**
