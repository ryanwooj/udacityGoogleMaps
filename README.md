# Ryan's Neighborhood Korean Restaurants
------------------------

## Description:
This single page app uses Google Maps and Places as well as random-users API to list all restaurants near Ryan in Los Angeles.
Each Restaurants have Address, Name, and Rating based on google API.
The App uses random-users API to generate random people and assign fake "Who was there x hours ago".

The App used create-react-app.

## How to run:
Make sure that you have Node.js installed on your device and then clone the repository.
Navigate to the directory that contains the project and write:
`npm install`
then run:
`npm start`
The browser should automatically open the app.  If it doesn't, navigate to [http://localhost:3000](http://localhost:3000)

## How to tun the app in Production build?

⚠️The service worker with the create-react-app only works in the production build, not in the development mode. 🔆
You can run it in production by using the following commands

npm run build
serve -s build
And then visit localhost:5000

## Built With
@google-maps-react - Set of React components wrapping underlying Google Maps API instances
@create-react-app - Bootstrapped the project



You may have to install this plugin to run the project. (Only when CORS error Cross Access Origin ...)
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbsojpeacfghkpbjhddihlkkiljbi/related?hl=en
