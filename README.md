# Test app
[DEMO](https://dm-sheremetiev.github.io/darly-test-app/)

A table with data about employees that can be changed in real time. The table data is taken from the fake API, so until we reload the page we will be able to send POST and DELETE requests as if we were working with the regular API. To work on the localhost, the `db.json` file is attached so that it is possible to work with the API using the json-server library.

If you try to submit a form with invalid or empty data, an alert with an explanation will be displayed. In this case, the form will not be submitted and the worker will not be added to the database.


## Get the initial code
- Clone the repo: `git clone https://github.com/dm-sheremetiev/darly-test-app`
- Go to your app folder: `cd darly-test-app`
- Run `npm install` to install the dependencies
- `npm start` - to run a development server
