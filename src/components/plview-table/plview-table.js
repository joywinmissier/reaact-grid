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

import TableRow from '../table-row/table-row';

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

  const [gapIndexValue, setgapIndexValue] = useState(1);

  const [itemExample, setitemExample] = useState(props.tableItems);

  var duration = 10;

  let rowHeader = [];

  let sampleRow = [];

  var headerName = 'Year';

  let durationData = [];

  let selectedYear = [];

  useEffect(() => {
    manipulateData(items);
    for (var i = 0; i < duration; i++) {
      sampleRow.push('y' + (i + 1));
      rowHeader.push(headerName + ' ' + (i + 1));
      durationData.push(i + 1);
    }
    setHeaderNameList(rowHeader);
    setBindYearsList(sampleRow);
    setDurationList(durationData);
   
    console.log(items);
  }, [])


  const recursiveCheck = (listOfData) =>{

  }
  
   const expandRow = (item, ind)  => {
     console.log("I", item)
    if (item?.subitems?.length > 0) {
      item.expansion = !item.expansion;
    }
    let someValue = [...itemExample];
 
    someValue[ind] = item;
    console.log(someValue);
    setitemExample([...itemExample]);
    
    console.log('Click', itemExample);
    //event.preventDefault();
  }

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
                      <label>
                        <input type="checkbox" value={data} onChange={handleChange(indexs)} />
                        <span className="label-text"> {data} </span>
                      </label>
                    </div>
                  )

                })

              }
            </div>
          </div>
          <hr className="line-color" />
          <div className="hide-holder horizontal-gap">
            <div className="hide-filter-text-holder">
              <p className="hide-show-text">Range</p>
            </div>


            <div>
              <div className="filter-input">
                <label className="label-text">Choose Year to Filter by Range</label>
                <select className="custom-drop">
                  <option>A</option>
                </select>
              </div>
              <div id="rangeFilter" className="slider-padding">
                <Button variant="outlined"
                  className="no-radius"
                  onClick={handleClick}
                >ABCD</Button>
              </div>

            </div>
          </div>

          <hr className="line-color" />
          <div>
            <Button className="normal-letter" color="secondary">Clear all filters</Button>
          </div>

        </Menu>
      </React.Fragment>
  }

  const useSortableData = (items, config = null) => {
    console.log('Initial');
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      console.log('Memo');
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


    //method to add "expansion" boolean to determine open/close of expansion panel
   const  manipulateData = (listOfItems, start = 1, oldList = []) => {
      listOfItems.map(items => {
        items['expansion'] = false;
        items['checked'] = false;
        items['index'] = start;
        start == 1 ? items['isParent'] = true : items['isParent'] = false;
        start == 1 ? items['id'] = items['name'].charAt(0) + start : items['id'] = oldList['name'].charAt(0) + start;
  
        start != 1 ? items['parentName'] = oldList['name'] : items['parentName'] = '';
        start != 1 ? items['parentId'] = oldList['id'] : items['parentId'] = '';
  
        if(!items.hasOwnProperty('subitems')){
          items['hasChild']= false
        }
        //items.hasOwnProperty('subitems') == false ? items['hasChild']= false : '';
        if (items.hasOwnProperty('subitems')) {
          let countIndex;
          countIndex = start + 1;
          items['subitems'].length>0 ? items['hasChild'] = true: items['hasChild']= false;
          if(items['subitems'].length > 0){
            manipulateData(items['subitems'], countIndex, items)
          }
          // items['subitems'].length > 0 ? manipulateData(items['subitems'], countIndex, items) : '';
        }
      });
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
                    <span className = "gap-close" onClick={(e) => { sortRequestCancel(null); e.stopPropagation(); }}>x</span> : ''}</th> : '')
            })}
            <th>Total</th>
          </thead>
          <tbody>
            <React.Fragment>

              <TableRow
                items={items}
                gapIndex = { gapIndexValue }
                durationList={durationList}
                selectionYear={selectionYear}
                bindYearsList={bindYearsList}
                expandRow = {expandRow}
              />
            </React.Fragment>

            {props.lastRow.map((dataItems, index) => {
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
