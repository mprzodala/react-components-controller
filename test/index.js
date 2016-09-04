import React from 'react';
import {renderToString} from 'react-dom/server';
import ReactComponentsController from '../src';
import {expect} from 'chai';

describe('React Components Controller', function () {
    class testComponent extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                test1:'testComponent state.test1'
            }
        }
        test(){
            return 'testComponent test method';
        }
        test2(){
            return 'testComponent test2 method';
        }
        render(){
            return (
                <div>{this.test()}</div>
            );
        }
    }

    class testComponent2 extends React.Component {
        constructor(props){
            super(props)
        }
        test(){
            return 'testComponent2 test method';
        }
        render(){
            return (
                <div>{this.test()}</div>
            );
        }
    }

    const extendTestComponent = {
        test(){
            it('extend component method', done => {
                if (this.state.test1) {
                    done();
                }
            });
            return 'extend Components test method';
        },
        test2(){
            return 'extend Components test2 method';
        }
    };

    it('create', function (done) {
        const Controller = new ReactComponentsController();
        if ( expect(Controller).to.be.an.instanceof(ReactComponentsController) &&
             expect(Controller.__components).to.be.an.instanceof(Object) &&
             expect(Controller.__extendComponents).to.be.an.instanceof(Object)) {
            done();
        }
    });


    it('register Component', function (done) {
        const Controller = new ReactComponentsController();
        Controller.registerComponent('test1', testComponent);
        if (expect(Controller.__components['test1']).to.be.an.instanceof(Object)) {
            done();
        }
    });

    it('register Before Component', function (done) {
        const Controller = new ReactComponentsController();
        Controller.registerComponent('test1', testComponent);
        if (expect(Controller.__components['test1'].beforeComponents).to.have.length(0)) {
            Controller.registerBeforeComponent('test1', testComponent2);
            if (expect(Controller.__components['test1'].beforeComponents).to.have.length(1)) {
                done();
            }
        }
    });

    it('register After Component', function (done) {
        const Controller = new ReactComponentsController();
        Controller.registerComponent('test1', testComponent);
        if (expect(Controller.__components['test1'].afterComponents).to.have.length(0)) {
            Controller.registerAfterComponent('test1', testComponent2);
            if (expect(Controller.__components['test1'].afterComponents).to.have.length(1)) {
                done();
            }
        }
    });

    it('get Component', function (done) {
        const Controller = new ReactComponentsController();
        Controller.registerComponent('test1', testComponent);
        if (expect(Controller.getComponent('test1')).to.be.an.instanceof(Object) &&
            expect(Controller.__components['test1']).to.be.an.instanceof(Object)) {
            done();
        }
    });

    it('extend Controller', function (done) {
        const Controller = new ReactComponentsController();
        const Controller2 = new ReactComponentsController();

        Controller.registerComponent('test1', testComponent);

        Controller2.registerComponent('test1', testComponent2);
        Controller2.registerComponent('test2', testComponent2);

        Controller.extendController(Controller2);

        if (expect(Controller.__components.test2).to.be.an.instanceof(Object) &&
            expect(Controller.__components.test3).to.not.an.instanceof(Object)) {
            done();
        }
    });

    it('register extend component', function (done) {
        const Controller = new ReactComponentsController();
        const Controller2 = new ReactComponentsController();

        Controller.registerComponent('test1', testComponent);

        Controller2.registerComponentExtend('test1', extendTestComponent);
        Controller2.registerComponent('test2', testComponent2);

        Controller.extendController(Controller2);

        const html = renderToString(Controller.getComponent('test1'));
        if(expect(html).to.have.string('extend Components test method')){
            done();
        }
    });
});