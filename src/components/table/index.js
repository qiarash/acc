import React, {useState} from 'react'
import styled from 'styled-components'
import {fieldTypes} from 'Root/models'
import Moment from 'react-moment'
import ToolsButton from './ToolsButton'
import media from 'Utils/styles'

const TableWrapper = styled.div `
  ${media.sm`
     overflow-x: auto;
  `};
`

const StyledTable = styled.table `
  width: 100%;
  border: 0;
  border-spacing: 0;
`

const TableHeader = styled.thead `
  background: #ECEEEF;
`

const TableBody = styled.tbody `

`

const Th = styled.th `
  font-weight: 500;
  text-transform: capitalize;
  border-bottom: 1px solid ${p => p.theme.light};
  color: ${p => p.theme.dark3};
  text-align: left;
  border-collapse: collapse;
  padding: 10px 16px;
`

const TableRow = styled.tr `
`

const Td = styled.td `
  font-weight: 300;
  text-transform: capitalize;
  color: ${p => p.theme.dark4};
  text-align: left;
  border-bottom: 1px solid ${p => p.theme.light}

  border-collapse: collapse;
  padding: 10px 16px;
`

let Table = ({
  resource,
  data,
  deletedCb,
  page = 1
}) => {
  let [openMenuSlug, setOpenMenuslug] = useState(null)
  let bible = data && data[0] && Object.entries(data[0])
  return (<TableWrapper>
    <StyledTable>
      <TableHeader>
        <TableRow>
          <Th>#</Th>
          {bible.map(([key, val]) => !val.hiddenInTable && <Th key={key}>{val.label || key}</Th>)}
          <Th></Th>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map((row, index) => <TableRow key={index}>
            <Td>{((page - 1) * 10) + index + 1}</Td>
            {
              Object.entries(row).map(([key, val]) => !val.hiddenInTable && <Td key={key}>
                <TableCell obj={val}/>
              </Td>)
            }
            <Td>
              <ToolsButton onClick={() => {
                  setOpenMenuslug(
                    openMenuSlug === row.slug
                    ? null
                    : row.slug)
                }} close={() => setOpenMenuslug(null)}
                resource={resource}
                item={row}
                deletedCb={deletedCb}
                opened={openMenuSlug === row.slug}/>
            </Td>
          </TableRow>)
        }
      </TableBody>
    </StyledTable>
  </TableWrapper>)
}

const TableCell = ({
  obj: {
    type,
    value,
    tableFormatter,
    showBy
  }
}) => {
  switch (type) {
    case fieldTypes.date:
      return <Moment format="MMMM DD, YYYY">{value}</Moment>
    case fieldTypes.list:
      return value.length > 0?value.map((v, i) => <React.Fragment key={i}>
        {v}
        {i !== value.length - 1 && ', '}
      </React.Fragment>):'-'
    default:
      return tableFormatter
        ? tableFormatter(value)
        : showBy
          ? value[showBy]
          : value

  }
}

export default Table
