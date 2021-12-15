// Importing
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');


// Instantiating express application and assigning to variable app
const app = express();

const PORT = 3001;

