import React, { createContext, Component } from 'react';

export const DataContext = createContext();

class DataContextProvider extends Component {
    state = {
        tableConfiguration : {
            showFilter: true,
          },
          stickFirst : true,
          stickLast : true
    }

 someTime = ()=>{

    }
    render() {
        return (
            <DataContext.Provider value = {{...this.state}}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

export default DataContextProvider;