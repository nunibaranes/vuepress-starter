![Build Status](https://gitlab.com/samdbeckham/vuepress-gl-pages/badges/master/build.svg)

---

website using [VuePress][project] and GitLab Pages.

---

This sets up a `node9.11.1` environment, then uses `yarn install` to install dependencies and `yarn build` to build out the website to the `./public` directory.
It also caches the `node_modules` directory to speed up sebsequent builds.

## Building locally

This project uses [yarn](https://yarnpkg.com), you'll need to install this globally before you can get started.

```
npm install -g yarn
```

Then you need to install the project dependencies:

```
yarn install
```

Now you're ready to go.
To run the local dev server just use the following command:

```
yarn start
```

Your website should be available at [http://localhost:8080/static-website/]


