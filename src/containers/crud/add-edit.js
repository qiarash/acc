import React, {useState, useEffect} from 'react'
import PageTitle from 'Components/PageTitle'
import Loading from 'Components/loading'
import {useAlert} from 'react-alert'
import Form from 'Components/form'
import {getSingleResource, addEditResource} from 'Api'

let ResourcePage = ({resource, model, name, match, history}) => {
  let [errorTimeStamp, setErrorTimeStamp] = useState(null)
  const alert = useAlert()
  let slug = match.params.slug
  let isEdit = !!slug
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    if (slug) {
      getSingleResource(resource, slug).then(res => setData(model(res[resource.slice(0, -1)])))
    } else
      setData(model())
    setLoading(false)
  }, [slug, match])
  return (<React.Fragment>
    <PageTitle>{
        !isEdit
          ? `New ${name.slice(0, -1)}`
          : `Edit ${name.slice(0, -1)}`
      }</PageTitle>
    {
      !loading && data
        ? <Form errorInResponse={errorTimeStamp}
            data={data}
            onSubmit={payload => addEditResource(resource, payload, isEdit, slug)
              .then(res => {
              alert.show({
                title: 'Well done!',
                body: `${resource.slice(0, -1)} ${isEdit?'updated':'created'} succesfully!`
              }, {type: 'succes'})
              history.push(`/${resource}`)
            }).catch(e => {
              if (e.data && e.data.errors)
                alert.show({
                  title: isEdit?'Updating failed!':'Creating failed!',
                  body: Object.entries(e.data.errors).map(([key, val]) => `${key} ${val}`)
                }, {type: 'error'})
              setErrorTimeStamp(new Date())
            })}/>
        : <Loading/>
    }
  </React.Fragment>)
}

export default ResourcePage
