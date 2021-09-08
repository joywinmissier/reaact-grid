import React, { useState } from 'react';

const Version = ({changeTitle}) => {

    const [version, setVersion] = useState([
        {version : 'v1.0', id : 1, framework : 'Angular'},
        {version : 'v2.0', id : 2, framework : 'React'}
    ])

    const changeAppName = (dropValue) => {
        changeTitle(`Master-Grid ${dropValue}`);
    }

    return ( 
        <div>
            <select onChange = {(e) => changeAppName(e.target.value)}>
                <option value="">--Select--</option>
                {version.map( (list, index) =>{
                   return (<option key={index} value = { list.framework }>{list.version}</option>)
                })}
            </select>
        </div>
     );
}
 
export default Version;