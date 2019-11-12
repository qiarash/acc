import React, {useState, useEffect} from 'react'
import PageTitle from 'Components/PageTitle'
import Loading from 'Components/loading'
import Form from 'Components/form'
import {getSingleResource} from 'Api'

let ResourcePage = ({resource, model, name, match}) => {
  let slug = match.params.slug
  console.log(!!slug)
  let isEdit = !!slug
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    if (slug) {
      getSingleResource(resource, slug).then(res => setData(model(res[resource.slice(0, -1)])))
    } else
      setData(model())
    setLoading(false)
  }, [slug])
  return (<React.Fragment>
    <PageTitle>{
        !isEdit
          ? `New ${name.slice(0, -1)}`
          : `Edit ${data && data.title
            ? data.title.value
            : name.slice(0, -1)}`
      }</PageTitle>
    {
      !loading && data
        ? <Form data={data}/>
        : <Loading/>
    }
  </React.Fragment>)
}

export default ResourcePage
