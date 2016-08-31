import React from 'react';
import _ from 'lodash';

const DynamicController = function(){
    this.__components = {};
    this.__extendComponents = {};

    this.registerComponent = function(componentName, component, options = {}){
        let beforeComponents = [], afterComponents = [];
        this.__components[componentName] = {component, options, beforeComponents, afterComponents};
    };

    this.registerBeforeComponent = function(componentName, component){
        let componentInstance = this.__components[componentName];
        if(!componentInstance){
            console.error('this component is not registered (' + componentName + ') You can\'t register before component');
            return;
        }
        this.__components[componentName].beforeComponents.push(component);
    };

    this.registerAfterComponent = function(componentName, component){
        let componentInstance = this.__components[componentName];
        if(!componentInstance){
            console.error('this component is not registered (' + componentName + ') You can\'t register after component');
            return;
        }
        this.__components[componentName].afterComponents.push(component);
    };

    this.registerComponentExtend = function (componentName, extend, options) {
        this.__extendComponents[componentName] = {extend, options};
    };

    this.extendComponent = function(componentName, extend, options){
        let componentInstance = this.__components[componentName];
        if(!componentInstance){
            console.error('extendedComponent don\'t exists (' + componentName + ')');
            return;
        }
        this.__components[componentName].component.prototype = _.extend(componentInstance.component.prototype, extend);
        this.__components[componentName].options = _.extend(componentInstance.options, options);
    };

    this.extendController = function(controller){
        if(controller && controller.__components) {
            this.__components = _.extend(this.__components, controller.__components);
            _.each(controller.__extendComponents, ({extend, options}, key) => this.extendComponent(key, extend, options));
        }else{
            console.error('extend controller failed! don\'t have __components');
        }
    };

    this.getComponent = function(componentName, props = {}, options = {}){
        let componentInstance = this.__components[componentName];
        if(!componentInstance){
            console.error('this component is not registered (' + componentName + ')');
            return <span>{componentName}</span>;
        }
        let optionsParams = _.extend(componentInstance.options, options);
        let {beforeComponents, afterComponents} = componentInstance;
        const Component = componentInstance.component;
        if(beforeComponents && beforeComponents.length > 0 || afterComponents && afterComponents.length > 0){

            return (
                <div>
                    {beforeComponents && beforeComponents.map((ComponentB, key) => <ComponentB {...props} Controller={this} key={key} options={optionsParams}/>)}
                    <Component {...props} Controller={this} options={optionsParams}/>
                    {afterComponents && afterComponents.map((ComponentA, key) => <ComponentA {...props} Controller={this} key={key} options={optionsParams}/>)}
                </div>
            );
        }
        return <Component {...props} Controller={this} options={optionsParams}/>;
    }
};

export default DynamicController;
