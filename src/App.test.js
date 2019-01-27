import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
    it('should render', () => {
        expect(shallow(<App />).html).not.toEqual('');
    });
});
