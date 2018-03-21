#!/usr/bin/env node

const DependencyTreeServer = require('./DependencyTreeServer');

const Koa = require('koa');
const route = require('koa-route');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors());

const handlers = {
  full: (ctx) => {
    console.log("full");
    ctx.body = DependencyTreeServer();
  },

  partial: (ctx, id) => {
    console.log(id);
    ctx.body = DependencyTreeServer(id);
  }
}

app.use(route.get('/', handlers.full));
app.use(route.get('/id/:id', handlers.partial));

app.listen(3462);
console.log("bearshark server is running");
