#!/usr/bin/env node

const DependencyTreeGenerator = require('./DependencyTreeGenerator');

const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors());

app.use(async ctx => {
  ctx.body = DependencyTreeGenerator();
});

app.listen(3462);
console.log("bearshark server is running");
