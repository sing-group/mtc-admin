import React from 'react';
import { List, TextField, EditButton } from 'admin-on-rest';
import { connect } from 'react-redux';
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card';

import { translate } from 'admin-on-rest';
import './styles.css'

const sessionStyle = {
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const mapStateToProps = state => ({ loginUser: state.login.loginUser })

const SessionsGrid =({ ids, data, basePath, translate, locale }) => (
    <div style={{ margin: '1em' }}>
        {ids.map(id =>
            <Card key={id} style={sessionStyle} className='sessionCard'>
                <CardHeader>
                    {translate("resources.sessions.name",{smart_count : 1})} {id}
                </CardHeader>
                <CardText>
                    <TextField record={data[id]} source="body" />
                </CardText>
            </Card>
        )}
    </div>
);
SessionsGrid.defaultProps = {
    data: {},
    ids: [],
};

export default connect(mapStateToProps)(
    translate((props) => (
    <div>
        <List {...props} filter={{ loginUser: props.loginUser }}>
            { <SessionsGrid translate={props.translate} locale={props.locale}/>}
        </List>
    </div>
))
)
