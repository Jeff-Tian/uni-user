import React from 'react';
import { Provider } from "react-redux";
import configStore from '../redux/store';

console.log('configuring store...')
const store = configStore()
console.log('store configured.')

const UniUserContainer = ({ children }) => <Provider store={store}>{children}</Provider>

export default UniUserContainer;