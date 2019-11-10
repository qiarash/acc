import React from 'react'
import { Layout } from 'react-admin';
import MyAppBar from './app-bar';
import { Sidebar } from 'react-admin';

const MySidebar = props => <Sidebar {...props} size={200} />;
const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar}/>;

export default MyLayout;
