import React from 'react';

const TableRow = (props) => {

    const expandRow = (item) => (event) => {
        if (item?.subitems?.length > 0) {
          item.expansion = !item.expansion;
        }
    console.log('Click');
        event.preventDefault();
      }

    return (
        <React.Fragment>
            {props.items.map((listValue, index) => {
                return (
                    <React.Fragment>
                        <tr key={index} onClick= {expandRow(listValue)}>
                            <td style={{paddingLeft : props.gapIndex*20+'px'}}>{listValue.name}</td>
                            {props.durationList.map((items, durationIndex) => {
                                return (
                                    !props.selectionYear.includes(props.bindYearsList[durationIndex]) ? <td key={durationIndex}>{listValue['y' + items]}</td> : ''
                                )
                            })}

                            <td>{listValue.total}</td>
                        </tr>
                      
                        {listValue.subitems && listValue.subitems.length > 0 &&  
                        <TableRow
                            items={listValue.subitems}
                            gapIndex = {props.gapIndex + 1}
                            durationList={props.durationList}
                            selectionYear={props.selectionYear}
                            bindYearsList={props.bindYearsList}
                        />}
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    );

}

export default TableRow;