import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin'
import TagsField from '../components/TagsField'
import BodyField from '../components/BodyField'

export const ArticleList = props => {
  return (<List {...props}>
    <Datagrid>
      <TextField label='#' source="index" sortable={false}/>
      <TextField source="title" sortable={false}/>
      <TextField label='Author' source="author.username" sortable={false}/>
      <TagsField label='Tags' record={props.record} sortable={false}/>
      <BodyField label='Excerpt' record={props.record} sortable={false}/>
      <DateField label="Created" source="createdAt" options={{
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }} sortable={false}/>
      <EditButton/>
      <DeleteButton undoable={false}/>
    </Datagrid>
  </List>)
}

export const ArticleEdit = props => (<Edit {...props}>
  <SimpleForm>
    <TextInput source="title"/>
    <TextInput source="body"/>
    <TextInput source="tagList"/>
    <TextInput source="description"/>
  </SimpleForm>
</Edit>);
