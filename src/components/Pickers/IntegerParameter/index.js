import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'admin-on-rest';
import Checkbox from 'material-ui/Checkbox';

class IntegerPicker extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { locale, translate, label, onCheck } = this.props
        return (
            <div style={pickerStyle}>
                <Checkbox
                    label
                    onCheck
                    style={styles.checkbox}
                    />
            </div>
        )

    }
}

BooleanPicker.PropTypes = {
    translate: PropTypes.func,
    label : PropTypes.string,
    onCheck : PropTypes.func
}

export default translate(BooleanPicker)
