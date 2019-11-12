import React, {useEffect, useState} from 'react'
import {getData} from 'Api'
import {StyledInput} from './styled'
import styled from 'styled-components'
import Loading from 'Components/loading'
import THEME from 'Root/theme'
import Button from 'Components/button'
import {FaCheckSquare, FaSquare} from 'react-icons/fa'

const InputWrapper = styled.div `
  position: relative;
`

const StyledButton = styled(Button)`
  position: absolute;
  width: auto;
  top: 0;
  right: 0;
  border: 1px solid ${p => p.theme.primary};
  height: 40px;
  opacity: ${p => p.visible
  ? 1
  : 0};
  visibility: ${p => p.visible
    ? 'visible'
    : 'hidden'};
`

const StyledList = styled.div `
  border-radius: 4px;
  border: 1px solid ${p => p.theme.light};
  width: 100%;
  padding: 16px 0;
  max-height: 300px;
  overflow: auto;
  margin-bottom: 25px;
`

const Item = styled.div `
  padding: 7px 18px;
  cursor: pointer;
  transition: all ease .3s;
  :hover{
    background: rgba(0,0,0,.04);
  }
  > span{
    margin-left: 8px;
    position: relative;
    top: -2px;
    text-transform: capitalize;
  }
`

let List = ({
  resource,
  ...props
}) => {
  let placeholder = `New ${resource.slice(0, -1)}`
  let [data, setData] = useState([])
  let [selected, setSelected] = useState(props.value)
  let [buttonLoading, setButtonLoading] = useState(false)
  let [newItem, setNewItem] = useState('')
  useEffect(() => {
    getData(resource).then(res => {
      let arr = [...props.value, ...res[resource]]
      setData(arr.filter((i, index) => index === arr.indexOf(i)))
    })
  }, [])
  useEffect(() => {
    props.onChange({target: {name: props.name, value: selected}})
  }, [selected])
  const submitNewResource = () => {
    setButtonLoading(true)
    if (!selected.includes(newItem)) {
      if(!data.includes(newItem))
      setData([
        newItem, ...data
      ])
      setSelected([...selected, newItem])
    }
    setNewItem('')
    setButtonLoading(false)
  }
  return (<div style={{
      width: '100%'
    }}>
    <InputWrapper>
      <StyledInput value={newItem} onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            submitNewResource()
          }
        }} onChange={({target: {
            value
          }}) => setNewItem(value)} placeholder={placeholder}/>
      <StyledButton loading={buttonLoading} onClick={() => submitNewResource()} styleType="primary" visible={newItem !== ''}>+ Add</StyledButton>
    </InputWrapper>
    <StyledList>
      {
        data.length
          ? data.sort((a,b) => a.localeCompare(b)).map(d => <Item key={d} onClick={() => setSelected(
              selected.includes(d)
              ? selected.filter(i => i !== d)
              : [
                ...selected,
                d
              ])}>
            {
              selected.includes(d)
                ? <FaCheckSquare color={THEME.primary}/>
                : <FaSquare color={THEME.light}/>
            }
            <span>{d}</span>
          </Item>)
          : <Loading/>
      }
    </StyledList>
  </div>)
}

export default List
