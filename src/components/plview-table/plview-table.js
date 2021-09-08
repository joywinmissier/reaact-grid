import React, { useContext, useEffect, useState } from 'react';
import './plview-table.scss';

import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, createStyles } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DataContext } from '../../context/DataContext';

const useStyles = makeStyles((theme) => {
  return createStyles({
    menuRoot: {
      minWidth: "33rem",
      maxWidth: "33rem"
      // top: "4.25rem !important",
    },
  });
});


export default function PLViewTable(props) {

  const { tableConfiguration, stickFirst, stickLast } = useContext(DataContext);

  const [headerNameList, setHeaderNameList] = useState([]);

  const [bindYearsList, setBindYearsList] = useState([]);

  const [selectionYear, setSelectionYear] = useState([]);
  const [durationList, setDurationList] = useState([]);

  const [checkboxItems, setCheckboxItems] = useState([
    { name: 'Year 1', isChecked: true },
    { name: 'Year 2', isChecked: false },
    { name: 'Year 3', isChecked: false },
    { name: 'Year 4', isChecked: false },
  ])

  const [checked, setChecked] = useState(true);

  var duration = 10;

  let rowHeader = [];

  let sampleRow = [];

  var headerName = 'Year';

  let durationData = [];

  let selectedYear = [];

  useEffect(() => {
    for (var i = 0; i < duration; i++) {
      sampleRow.push('y' + (i + 1));
      rowHeader.push(headerName + ' ' + (i + 1));
      durationData.push(i + 1);
    }
    setHeaderNameList(rowHeader);
    setBindYearsList(sampleRow);
    setDurationList(durationData);
  }, [])


  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (i) => (event) => {

    if (selectionYear.length > 0) {
      if (selectionYear.includes(bindYearsList[i])) {
        let removeIndex = selectionYear.indexOf(bindYearsList[i]);
        selectionYear.splice(removeIndex, 1);
        setSelectionYear([...selectionYear, selectionYear]);
      }
      else {
        setSelectionYear([...selectionYear, bindYearsList[i]]);

      }
    }
    else {
      setSelectionYear([...selectionYear, bindYearsList[i]]);
    }

  };

  let button;
  if (tableConfiguration.showFilter) {
    button =
      <React.Fragment>
        <Button variant="outlined"
          className="no-radius"
          endIcon={<FilterListIcon />}
          onClick={handleClick}
        >Filter</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{
            paper: classes.menuRoot,
          }}
        >
          <div className="title-container">
            <p className="panel-title">Filter By</p>
          </div>

          <div className="hide-holder horizontal-gap" >
            <div className="hide-filter-text-holder">
              <p className="hide-show-text">Hide/Show</p>
            </div>

            <div id="yearCheckbox" className="filter-boxes">

              {
                headerNameList.map((data, indexs) => {
                  return (
                    <div className="checkbox-list" key={indexs}>
                      <input type="checkbox" value={data} onChange={handleChange(indexs)} />
                      <span className="label-text"> {data} </span>
                    </div>
                  )

                })

              }
            </div>
          </div>
        </Menu>
      </React.Fragment>
  }

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          //   if (a[sortConfig.key] < b[sortConfig.key]) {
          //     return sortConfig.direction === 'ascending' ? -1 : 1;
          //   }
          //   if (a[sortConfig.key] > b[sortConfig.key]) {
          //     return sortConfig.direction === 'ascending' ? 1 : -1;
          //   }
          //   return 0;
          if (sortConfig.direction === 'ascending') {
            return a[sortConfig.key] - b[sortConfig.key]
          }
          else {
            return b[sortConfig.key] - a[sortConfig.key]
          }

        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      console.log(key);
      if (key !== null) {
        let direction = 'ascending';
        if (
          sortConfig &&
          sortConfig.key === key &&
          sortConfig.direction === 'ascending'
        ) {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      }
      else {
        setSortConfig({ key, direction: '' })
      }

    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(props.tableItems);

  const sortRequestCancel = (data) => {
    requestSort(data);
  }



  return (

    <React.Fragment>
      <div className="filter-holder">
        {
          button
        }
      </div>
      <div className="table-container">
        <table className={` table-size  ${stickFirst ? 'sticky-first' : 'non-sticky'} ${stickLast ? 'sticky-last' : ''} `} cellSpacing="0" cellPadding="5">
          <thead className="header-align row-text-design" id="head-item">

            <th className="category-design">Category</th>
            {headerNameList.map((listItems, index) => {
              return (
                !selectionYear.includes(bindYearsList[index]) ? <th key={index} onClick={() => requestSort('y' + durationList[index])}>{listItems}
                  {(sortConfig !== null && sortConfig.direction !== ''
                    && sortConfig.key == 'y' + durationList[index]) ?
                    <span onClick={(e) => { sortRequestCancel(null); e.stopPropagation(); }}>x</span> : ''}</th> : '')
            })}
            <th>Total</th>
          </thead>
          <tbody>
            {items.map((listValue, index) => {
              return (
                <tr key={index}>
                  <td>{listValue.name}</td>
                  {durationList.map((items, durationIndex) => {
                    return (
                      !selectionYear.includes(bindYearsList[durationIndex]) ? <td key={durationIndex}>{listValue['y' + items]}</td> : ''
                    )

                  })}

                  <td>{listValue.total}</td>
                </tr>
              );
            })
            }
            {props.lastRow.map((dataItems, index) => {
              console.log('PP', dataItems);
              return (
                <tr id="lastRow" key={index}>
                  <td>{dataItems.name}</td>
                  {durationList.map((items, index) => {
                    return (
                      !selectionYear.includes(bindYearsList[index]) ? <td key={index}>{dataItems['y' + items]}</td> : ''
                    )

                  })}
                  <td>{dataItems.total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )

}
