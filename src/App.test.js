import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import SignUpForm, { EmailInput } from './TeamSignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<SignUpForm />', () => {
   const wrapper = mount(<SignUpForm />);

   describe('<EmailInput />', () => {
      const email = wrapper.find('#email');
      it('should show an error message specific to leaving the field blank', () => {
         email.simulate('change', {target:{value:''}});
         expect(wrapper.contains(<p className="help-block error-missing">we need to know your email address</p>)).toEqual(true);
      });


      it('should show an error message specific to entering an invalid value', () => {
         email.simulate('change', {target:{value:'invalid'}});
         expect(wrapper.contains(<p className="help-block error-invalid">this is not a valid email address</p>)).toEqual(true);
      });

      it('should not show an error message if a valid value is entered', () => {
         email.simulate('change', {target:{value:'email@domain.com'}});
         expect(wrapper.contains(<p className="help-block error-invalid">this is not a valid email address</p>)).toEqual(false);
         expect(wrapper.contains(<p className="help-block error-missing">we need to know your email address</p>)).toEqual(false);
      });

      it('should update the parent state when changed', () => {
         email.simulate('change', {target:{value:'change'}});
         expect(wrapper.state('email')).toEqual({ valid: false, value: 'change'});
      });

   });

})