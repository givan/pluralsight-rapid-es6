console.log('starting in server.mjs...');

// Here we use node's --experimental-modules feature. You can also use transpiler like Babel or Traceur - 
// Read this article: https://appdividend.com/2019/03/13/es6-modules-in-node-tutorial-with-example/

import { sqrt, square } from './app';
const a = sqrt(4);
const b = square(2);
console.log(a);
console.log(b);

// import { projectId, projectName } from './module1';
// console.log(`${projectName} has id: ${projectId}`); // ReferenceError: projectId is not defined

import { projectId as id, projectName as pjName } from './module1'; // SntaxError: Identifier 'projectName' has already been declared
console.log(`${pjName} has id: ${id}`);

// import projectName from './module1-default';
import { default as myProjectDefaultName } from './module1-default';
console.log(`Project default name: ${myProjectDefaultName}`);

import * as values from './module1-default';
console.log(values);

import './module5';
import './module6';
import './module6-promise';
import './module7';
import './module8';

console.log('ending in server.mjs...');