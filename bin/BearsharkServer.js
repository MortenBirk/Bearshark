#!/usr/bin/env node

const DependencyTreeServer = require('./DependencyTreeServer');

const Koa = require('koa');
const route = require('koa-route');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors());

const handlers = {
  full: (ctx) => {
    ctx.body = DependencyTreeServer();
  },

  partial: (ctx, id) => {
    ctx.body = DependencyTreeServer(id);
  },

  rebuild: (ctx) => {
    ctx.body = DependencyTreeServer(null, true);
  },

  rebuildId: (ctx, id) => {
    ctx.body = DependencyTreeServer(id, true);
  }
}

app.use(route.get('/', handlers.full));
app.use(route.get('/id/:id', handlers.partial));
app.use(route.get('/rebuild', handlers.rebuild));
app.use(route.get('/rebuild/:id', handlers.rebuildId));

app.listen(3462);
console.log("bearshark server is running");
