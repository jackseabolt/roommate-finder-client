import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { connect } from 'react-redux';
import {registerUser} from '../actions/user';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed, email} from '../validators';

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, email} = values;
        const user = {username, password, looking_for: this.props.looking_for, email};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {

        console.log("LOOKING_FOR", this.props.looking_for)
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, length({min: 10, max: 72}), isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matches('password')]}
                />
                <label htmlFor="email">Email</label>
                <Field
                    component={Input}
                    type="email"
                    name="email"
                    validate={email}
                />
                <button
                    className="button-blue"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}


export const mapStateToProps = state => ({
    looking_for: state.user.looking_for, 
    apples: "HEY THERE"
}); 

RegistrationForm = connect(mapStateToProps)(RegistrationForm);

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);

