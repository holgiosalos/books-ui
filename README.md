# Library Automation Training

This repository was created in order to training to automation testing practices from scratch.

This repository is only the Front End, please check the [back repository](https://github.com/holgiosalos/books-back) in order to have all the application

## How To Deploy the application

This applications is thinking to deploy in [Heroku](https://www.heroku.com/) and uses the following environment varibles:

| Env Variable     | Description                                                               | Value  |
|------------------|---------------------------------------------------------------------------|--------|
| BASE_URL         | The backend URL                                                           |        |
| NODE_BUILD_FLAGS | Setting this variable will run ng build <value> in the build step instead | --prod |

**Note 1**: In order to set these environment variables in Heroku check [the documentation](https://devcenter.heroku.com/articles/config-vars)

**Note 2**: Note that these variables are injected at build time if needs to change their values must redeploy the application

## How To Update your fork repository

Run the following commands:

```bash
  git remote add upstream git@github.com:holgiosalo/books-ui.git
  git pull upstream main
```

If you have altered it, you then need to rebase it.

```bash
  git rebase upstream/main
````

## Angular Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
