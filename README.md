<img src="https://raw.githubusercontent.com/mprzodala/react-components-controller/master/chart.png">

### EXAMPLE CODE###
```
----project.js-----
import React from 'react';
import ReactComponentsController from 'react-components-controller';
import PackageComponent from '/packages/somepackage/packege';
import ListingItem from './mods/ListingItem';
import Navbar from './mods/Navbar';

const Controller = new ReactComponentsController();
Controller.registerComponent('ListingItem', ListingItem);

export default () => (
    <div>
        <Navbar />
        <PackageComponent extendController={Controller} />
    </div>
);

----package.js----
import React from 'react';
import ReactComponentsController from 'react-components-controller';
import ListingWrapper from './components/ListingWrapper';
import ListingContainer from './components/ListingContainer';
import ListingItem from './components/ListingItem';
import ListingItemAvatar from './components/ListingItemAvatar';

const Controller = new ReactComponentsController();
Controller.registerComponent('ListingWrapper', ListingWrapper);
Controller.registerComponent('ListingContainer', ListingContainer);
Controller.registerComponent('ListingItem', ListingItem);
Controller.registerComponent('ListingItemAvatar', ListingItemAvatar);

export default ({extendController}) => {
    if(extendController){
        Controller.extendController(extendController);
    }
    return (
        <div>
            {Controller.getComponent('ListingWrapper',{ListingTitle:'Default lising'})}
        </div>
    );
}


----ListingWrapper.jsx---
import React from 'react';

export default ({Controller, ListingTitle}) => {
    if(extendController){
        Controller.extendController(extendController);
    }
    return (
        <div>
            {ListingTitle}
            {Controller.getComponent('ListingContainer',{ListingContainerTitle:'Default lising container title'})}
        </div>
    );
}
```

## Methods ##
**registerComponent(componentName, component, options)**

* componentName - [String] name of virtual instance where Your component will be displayed
* component - [Component] React Component to display
* options - [Object] of additional information. You can use it in the component


**registerBeforeComponent(componentName, component)**

* componentName - [String] name of virtual instance where main component will be displayed after this component
* component - [Component] React Component to display


**registerAfterComponent(componentName, component)**

* componentName - [String] name of virtual instance where main component will be displayed before this component
* component - [Component] React Component to display

**registerComponentExtend(componentName, extend, options)**

* componentName - [String] name of virtual instance where main component will be displayed
* extend - [Object] Object with function that will be extended and overwrite
* options - [Object] of additional information. You can use it in the component

**extendComponent(componentName, extend, options)**

* componentName - [String] name of virtual instance where main component will be displayed
* extend - [Object] Object with function that will be extended and overwrite
* options - [Object] of additional information. You can use it in the component

**extendController(controller)**

* controller - [DynamicController] more important controller that will overwrite old controller 

**getComponent(componentName, props, options)**

* componentName - [String] name of virtual instance where Your component will be displayed
* props - [Object] Props that React Component will have
* options - [Object] additional information. You can use it in the component and overwrite defined options
