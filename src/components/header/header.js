import React, { useContext, useState } from 'react';
import { ColorContext } from '../../context/ColorContext';
import Version from '../version';
import './header.scss';

// class Header extends React.Component {

//     static contextType = ColorContext;


//     title = 'Master-Grid React';
//     render() {
//         const { degree, headerColor , gradientColor} = this.context;
//         return (
//             <React.Fragment>
//                 <div>
//                     <header style={ {background :`linear-gradient(${degree}, ${headerColor}, ${gradientColor})`}}>
//                         <h1>{this.title}</h1>
//                     </header>

//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// export default Header;

const Header = () => {

    const [title, setTitle] = useState('Master-Grid');

    const { degree, headerColor, gradientColor } = useContext(ColorContext);

    const changeTitle = (e) => {
        setTitle(e);
    }
    return (

        <React.Fragment>
            <header style={{ background: `linear-gradient(${degree}, ${headerColor}, ${gradientColor})` }}>
                <h1 >{title}</h1>
                <Version changeTitle={changeTitle} />
            </header>

        </React.Fragment>

    );
}

export default Header;

