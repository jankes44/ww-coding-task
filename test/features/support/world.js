const {
  setWorldConstructor,
} = require('cucumber');
const supertest = require('supertest');
const expect = require('expect');
const env = require('../../../src/env-vars');
const server = require('../../../src/server');

function CustomWorld(args) {
  this.supertest = supertest;
  this.expect = expect;
  this.expressInstance = server;
  this.env = env;
  this.attach = args.attach;
}

setWorldConstructor(CustomWorld);
