import React, {createContext, Component, useState} from 'react';

export const ColorContext = createContext();
// class ColorContextProvider extends Component {
//     state = { 
//         headerColor : '#55072b',
//         gradientColor : '#3c00bd',
//         degree : '150deg'
//      }
//     render() { 
//         return ( 
//             <ColorContext.Provider value = {{...this.state}}>
//                 {this.props.children}
//             </ColorContext.Provider>
//          );
//     }
// }
 

const ColorContextProvider = (props) => {

    const [headerDesign] = useState({ 
        headerColor : '#55072b',
        gradientColor : '#3c00bd',
        degree : '150deg'
     });
    return ( 
    <ColorContext.Provider value = {{...headerDesign}}>
        {props.children}
    </ColorContext.Provider>
     );
}
 
export default ColorContextProvider;
