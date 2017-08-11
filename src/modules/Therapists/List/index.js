import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton } from 'admin-on-rest';
import { connect } from 'react-redux';


const mapStateToProps = state => ( { idUser: state.login.id })

export default connect(mapStateToProps)((props) => (
    <List {...props} filter={{director_id :props.idUser}}> 
        <Datagrid >
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="center_id" reference="centers" linkType="none">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
));