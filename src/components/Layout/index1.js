import { connect } from 'react-redux';
import { Layout } from 'admin-on-rest';

export default connect(state => (!console.log("ESTADO LAYOUT", state )&& {
    locale: state.locale,
}))(Layout);