# frontend-etna-debank

node install: "npm i",
start: "gulp",
start:prod: "gulp prod",
build: "gulp build",
build:prod: "gulp build_prod",
build:prod:mobile: "gulp build_prod_mobile",
prettierJS: "prettier --write ./src/**/*.js",
lintJS: "eslint --fix --quiet ./src/**/*.js",
prettierSCSS: "prettier --write ./src/**/*.scss",
lintSCSS: "stylelint --fix ./src/**/*.scss"

