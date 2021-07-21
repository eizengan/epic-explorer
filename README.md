A simple React-based PWA built around NASA's Earth Polychromatic Imaging Camera (EPIC) API, bootstrapped with [Node](https://nodejs.org/en/) and [Create React App](https://github.com/facebookincubator/create-react-app).

Installation:
 * Ensure the most recent version of Node is installed
 * Clone repo from https://github.com/eizengan/epic-explorer.git
 * Navigate to project root - **all other instructions expect you to be here**
 * Run '_npm install_' to install dependencies - this can take a while

Setting API key (optional-ish):
 * This project will run with a **heavily rate-limited** demo key if no API key is provided
 * Applications for API keys can be made [here](https://api.nasa.gov/index.html#apply-for-an-api-key), and are processed almost immediately
 * To add your API key run `echo "REACT_APP_API_KEY=[YOUR KEY]" > .env.local` (or equivalent)

Testing and running:
 * To run all included tests run '_npm test_'
 * To start a dev server and begin debugging run '_npm start_'
