import React, {useEffect, useState} from 'react'
import PageTitle from 'Components/PageTitle'
import Loading from 'Components/loading'
import Table from 'Components/table'
import {getData} from 'Api'

let ResourcePage = ({resource, model, name, match}) => {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [count, setCount] = useState(null)
  let page = match.params.page
  console.log(page)
  useEffect(() => {
    setLoading(true)
    getData(resource, page).then(res => {
      setData(res[resource].map(item => model(item)))
      setCount(res[resource + 'Count'])
      setLoading(false)
    })
  }, [page])
  return (<React.Fragment>
    <PageTitle>all {name}</PageTitle>
    {console.log(data)}
    {
      loading
        ? <Loading/>
        : <Table data={data} resource={resource} />
    }
  </React.Fragment>)
}

export default ResourcePage
