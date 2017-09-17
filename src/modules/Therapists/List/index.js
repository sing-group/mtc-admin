import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton } from 'admin-on-rest';
import { connect } from 'react-redux';


const mapStateToProps = state => ( { userLogin: state.login.userLogin })

export default connect(mapStateToProps)((props) => (
    <List {...props}> 
        <Datagrid >
            <TextField source="name" />
            <ReferenceField source="institution" reference="center" linkType="none">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
));