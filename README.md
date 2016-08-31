### EXAMPLE ###

```
import React from 'react';
import DynamicController from 'meteor/universe:dynamic-components';
import ListinItem from '../components/ListingItem';
import ListingInsideItem from '../components/ListingInsideItem';
import ListinHeader from '../components/ListingHeader';
import ListinFooter from '../components/ListingFooter';

let Controller = new DynamicController();
Controller.registerComponent('Item',ListinItem);
Controller.registerComponent('InsideItem',ListingInsideItem);
Controller.registerBeforeComponent('Item',ListinHeader);
Controller.registerAfterComponent('Item',ListinFooter);

export default ({extendController}) => {
    if(extendController){
        Controller.extendController(extendController);
    }
    return (
        <div className="listin-container">Listing Wrapper {Controller.getComponent('Item',{test:'aaaaaa'})}</div>
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