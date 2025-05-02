**Link to the fully deployed app:** [https://newsexplorer.flazzard.com/](https://newsexplorer.flazzard.com/)

**This is the link to the frontend GitHub** [link](https://github.com/VariusValinium22/NewsExplorer)

Project Name: se_project_react

Description: This is a project that institutes the use of a news API called [NewsAPI.net](https://newsapi.org/).

There is a header that has the navigation for Signing in.
There is two modals:
The signin button opens a modal that allows a user to sign in with an email and password. There is a second modal for Registration when you click the Sign up link that allows a user to add their Email, Password and Name.

This is the frontEnd of the project: NewsExplorer-frontend

The Temporary backend to pass review for the frontend: newsexplorer-backend exists in the Google Cloud VM called wtwr. This is where the index.js and package.json files live. This creates an Express backend with a route that uuses /everything as seen in the NewsAPI Documentation within fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);


Technologies: React.js; Vite.js; HTML/CSS; BEM/semantic tags, NewsAPI API;

DEV run: NewsExplorer-frontend: To run this project: npm run dev

PROD run: [newsexplorer](https://newsexplorer.flazzard.com/)

Domain Names:
https://newsexplorer.flazzard.com
https://www.newsexplorer.flazzard.com


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

