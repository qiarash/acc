import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const MyAppBar = props => (<React.Fragment>
  <div style={{
      marginTop: 64
    }}/>
  <AppBar {...props} style={{
      background: '#373A3C'
    }}>
    <Toolbar>
      <Typography variant="title" component="div" style={{
          color: '#fff'
        }}>
        ArvanCloud Challenge
      </Typography>
      <Typography variant="title" component="div" style={{
          color: '#fff',
          marginLeft: 20,
          fontSize: 14
        }}>
        Welcome {props.username || 'username'}
      </Typography>
    </Toolbar>
  </AppBar>
</React.Fragment>);

export default MyAppBar;
