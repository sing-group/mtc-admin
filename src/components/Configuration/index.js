import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { translate, changeLocale as changeLocaleAction, ViewTitle } from 'admin-on-rest';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({ theme, locale, changeTheme, changeLocale, translate }) => (
    <Card>
        <ViewTitle title={translate('common.configuration.title')} />
        <CardText>
            <div style={styles.label}>{translate('common.configuration.languageSelector')}</div>
            <RaisedButton style={styles.button} label="en" primary={locale === 'en'} onClick={() => changeLocale('en')} />
            <RaisedButton style={styles.button} label="es" primary={locale === 'es'} onClick={() => changeLocale('es')} />
            <RaisedButton style={styles.button} label="ga" primary={locale === 'ga'} onClick={() => changeLocale('ga')} />
        </CardText>
    </Card>
);

const mapStateToProps = state => ({
    //locale: state.locale,
});

export default connect(null, {
    changeLocale: changeLocaleAction,
})(translate(Configuration));