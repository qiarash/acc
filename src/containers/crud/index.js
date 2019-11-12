import React, {useEffect, useState} from 'react'
import PageTitle from 'Components/PageTitle'
import Loading from 'Components/loading'
import Table from 'Components/table'
import {getData} from 'Api'
import ReactPaginate from 'react-paginate';
import './pagination.css'

let ResourcePage = ({resource, model, name, match, history}) => {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [count, setCount] = useState(null)
  let page = match.params.page
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
    {
      loading
        ? <Loading/>
        : <React.Fragment>
            <Table data={data} resource={resource}/>
            <div className='pagination-wrapper'>
              <ReactPaginate
                disableInitialCallback={true}
                forcePage={page? parseInt(page - 1) : 0}
                onPageChange={p=>history.push(`/${resource}/page/${p.selected + 1}`)}
                hrefBuilder={p => `${resource}/page/${p}`}
                pageCount={count / 10}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                nextLabel={'>'}
                previousLabel={'<'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'} />
              </div>
          </React.Fragment>
    }
  </React.Fragment>)
}

export default ResourcePage
