import React from 'react';
import { Provider } from "react-redux";
import configStore from '../redux/store';

const store = configStore()

const UniUserContainer = ({ children }) => <Provider store={store}>{children}</Provider>

export default UniUserContainer;