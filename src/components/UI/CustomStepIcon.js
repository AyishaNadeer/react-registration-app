import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { clsx } from 'clsx';

const useCustomStepIconStyles = makeStyles({
  root: {
    color:'white',
    top: 12,
   cursor:'pointer',
 fontSize:'10px'
  },
  active: {
  
     color: "white",
    padding: "3px",
    borderRadius: "50%", //outer circke
    border: "1px solid red",
    marginY: "-3px",
   
  },
  disabled:
  {
    backgroundColor: '#eaeaf0',
    width: 21,
    height: 21,
    borderRadius: '50%', //inner circle
    border: "1px solid red",
    display: 'flex', /* or inline-flex */
    alignItems: 'center',
    justifyContent: 'center',
    color:'grey'
  },
  circle: {
   padding:'2px',
    width: 21,
    height: 21,
    borderRadius: '50%', //inner circle
    border: "1px solid red",
    backgroundColor: 'red',
    display: 'flex', /* or inline-flex */
  alignItems: 'center',
  justifyContent: 'center',
  },
  completed: {
    color: 'white',
    width: 21,
    height: 21,
    borderRadius: '50%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex', /* or inline-flex */
    alignItems: 'center',
    justifyContent: 'center',
  }

})

const CustomStepIcon = (props) => {
  const classes = useCustomStepIconStyles();
  const { active, completed, disabled, icon } = props;

  return (
    <div
      className={clsx(classes.root, 
        {
        [classes.active]: active,
        [classes.disabled]: disabled,
      })}
    >
      <div className={completed? classes.completed: (active? classes.circle : classes.disabled) } > {icon} </div>
    </div>
  );
}

export default CustomStepIcon;
