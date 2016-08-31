// import {Tinytest} from 'meteor/tinytest';
// import DynamiController from '../lib/dynamic-components';
// import React from 'react';
//
// if(Meteor.isClient) {
//     const testComponent = React.createClass({
//         test(){
//             return 'test';
//         },
//         render(){
//             return (
//                 <div>{this.test()}</div>
//             );
//         }
//     });
//
//     const testComponent2 = React.createClass({
//         test(){
//             return 'test2';
//         },
//         render(){
//             return (
//                 <div>{this.test()}</div>
//             );
//         }
//     });
//
//     const extendTestComponent = {
//         test: () => {
//             return 'extendTest';
//         },
//         test2: () => {
//             return 'extendFunction';
//         }
//     };
//
//     Tinytest.add('DynamicController - create', function (test) {
//         const Controller = new DynamiController();
//         test.instanceOf(Controller, DynamiController);
//         test.instanceOf(Controller.__components, Object);
//         test.instanceOf(Controller.__extendComponents, Object);
//     });
//
//
//     Tinytest.add('DynamicController - registerComponent', function (test) {
//         const Controller = new DynamiController();
//         Controller.registerComponent('test1', testComponent);
//         test.instanceOf(Controller.__components['test1'], Object);
//     });
//
//     Tinytest.add('DynamicController - registerBeforeComponent', function (test) {
//         const Controller = new DynamiController();
//         Controller.registerComponent('test1', testComponent);
//         test.length(Controller.__components['test1'].beforeComponents, 0);
//         Controller.registerBeforeComponent('test1', testComponent2);
//         test.length(Controller.__components['test1'].beforeComponents, 1);
//     });
//
//     Tinytest.add('DynamicController - registerAfterComponent', function (test) {
//         const Controller = new DynamiController();
//         Controller.registerComponent('test1', testComponent);
//         test.length(Controller.__components['test1'].afterComponents, 0);
//         Controller.registerAfterComponent('test1', testComponent2);
//         test.length(Controller.__components['test1'].afterComponents, 1);
//     });
//
//     Tinytest.add('DynamicController - getComponent', function (test) {
//         const Controller = new DynamiController();
//         Controller.registerComponent('test1', testComponent);
//         test.instanceOf(Controller.getComponent('test1'), Object);
//         test.instanceOf(Controller.__components['test1'], Object);
//     });
//
//     Tinytest.add('DynamicController - extendController', function (test) {
//         const Controller = new DynamiController();
//         const Controller2 = new DynamiController();
//
//         Controller.registerComponent('test1', testComponent);
//
//         Controller2.registerComponent('test1', testComponent2);
//         Controller2.registerComponent('test2', testComponent2);
//
//         Controller.extendController(Controller2);
//
//         test.instanceOf(Controller.__components.test2, Object);
//         test.isFalse(Controller.__components.test3);
//     });
// }