import React from 'react';
import PLViewTable from '../plview-table/plview-table';

import Header from '../header/header';

class ProfitLoss extends React.Component {

  //static contextType = DataContext;
  // const { showFilter } = this.context;
  // console.log(this.context);

  lastItem = [];

  oneTable = [
    {
      name: 'Target State',
      y1: '7020.00',
      y2: '100.00',
      y3: '120.00',
      y4: '2220.00',
      y5: '110.00',
      y6: '40.00',
      y7: '330.00',
      y8: '30.00',
      y9: '30.00',
      y10: '10.00',
      total: 22572.2
    },
    {
      name: 'Target State 1',
      y1: '5021.00',
      y2: '10.00',
      y3: '220.00',
      y4: '2220.00',
      y5: '110.00',
      y6: '40.00',
      y7: '330.00',
      y8: '30.00',
      y9: '30.00',
      y10: '10.00',
      total: 22572.2,
    },
    {
      name: 'Target State 2',
      y1: '22.00',
      y2: '70.00',
      y3: '1220.00',
      y4: '2220.00',
      y5: '110.00',
      y6: '40.00',
      y7: '330.00',
      y8: '30.00',
      y9: '630.00',
      y10: '10.00',
      total: 22572.2,
    },
    {
      name: 'Target State 3',
      y1: '123.00',
      y2: '10.00',
      y3: '20.00',
      y4: '2220.00',
      y5: '110.00',
      y6: '40.00',
      y7: '330.00',
      y8: '30.00',
      y9: '30.00',
      y10: '10.00',
      total: 22572.2,
    },
    {
      name: 'Net Savings',
      total: 22572.2,
      y1: 5194.46,
      y2: 8560.45,
      y3: 8817.28,
      y4: 0,
      y5: 0,
      y6: 0,
      y7: 0,
      y8: 0,
      y9: 0,
      y10: 0,
      // 'expanded': false,
      subitems: []
    }
  ]

  // stickFirst = false;
  // stickLast = false;

  // tableConfiguration = {
  //   showFilter: true,

  // }
  constructor(props) {
    super(props);
  
    this.lastItem.push(this.oneTable.pop());
    console.log('Constructor', this.lastItem);
  }

  // componentDidMount() {
  //   console.log('Did Mount');
  // }

  // componentWillUnmount() {
  //   console.log('Will Un Mount');
  // }

  render() {
        return (
          <div>
            <Header/>
            <PLViewTable
              tableItems={this.oneTable}
              lastRow={this.lastItem}
            />
          </div>
        )

  }

}

export default ProfitLoss;