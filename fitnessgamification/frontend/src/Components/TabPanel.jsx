
/*
  Content for the Each tab.
  props.children - Whatever the TabPanel has as content, will be in this.
  If value and index are same, we display only that TabPanel's content.
  props. ...other - Will contain all the extra props, that we may be sending.
*/
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div >
      {
        value === index && 
        <div {...other}>
          {children}
          {/* Children will be whatever content that is passed to the TabPanel. */}
        </div>
      }
    </div>
  );
}

export default TabPanel;