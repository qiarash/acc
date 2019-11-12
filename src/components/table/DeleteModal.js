import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Button from 'Components/button'
import {FaTimes} from 'react-icons/fa'
import styled from 'styled-components'
import THEME from 'Root/theme'
import {useAlert} from 'react-alert'
import {deleteResource} from 'Api'

const ModalWrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all ease .3s;
  opacity: ${p => p.visible
  ? 1
  : 0};
  visibility: ${p => p.visible
    ? 'visible'
    : 'hidden'};
  z-index: 12;

`

const Modal = styled.div `
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid ${p => p.theme.dark3};
  overflow: hidden;
`
const ModalHeader = styled.div `
  border-bottom: 1px solid ${p => p.theme.light};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h3 {
    padding: 20px 16px;
    margin: 0;
    font-weight: 500;
    text-transform: capitalize;
  }

`

const ModalBody = styled.div `
  padding: 20px 19px 40px;
`
const ModalFooter = styled.div `
  padding: 16px;
  border-top: 1px solid ${p => p.theme.light};
  display: flex;
  flex-directly: row;
  justify-content: flex-end;
`

const Overlay = styled.div `
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 11;
  background: rgba(0,0,0,.7);
  transition: all ease .3s;
  opacity: ${p => p.visible
  ? 1
  : 0};
  visibility: ${p => p.visible
    ? 'visible'
    : 'hidden'};
`

let DeleteModal = ({resource, item, deletedCb}) => {
  const [open, setOpen] = useState(false)
  const [deleteLoading, setDeletelLoading] = useState(false)
  const alert = useAlert()
  return (<React.Fragment>
    <Button onClick={() => setOpen(true)} styleType='none' bgColor={'transparent'} styles={{
        border: 0,
        textAlign: 'left',
        fontWeight: 200
      }}>delete</Button>
    <ModalPortal>
      <ModalWrapper visible={open}>
        <Modal>
          <ModalHeader>
            <h3>delete {resource.slice(0, -1)}</h3>
            <Button styles={{
                width: 'auto',
                border: 0
              }} styleType='none'
              bgColor={'transparent'}
              icon={<FaTimes color = "#999" />}
              onClick={() => setOpen(false)}/>
          </ModalHeader>
          <ModalBody>
            Are you sure to delete {resource.slice(0, -1)}?
          </ModalBody>
          <ModalFooter>
            <Button styles={{borderColor: THEME.light, marginRight: 15}}
              width="auto"
              color={THEME.dark3}
              onClick={() => setOpen(false)}
              styleType="none"
              bgColor='#fff'>No</Button>
            <Button width="auto"
              color="#fff"
              styleType="none"
              loading={deleteLoading}
              onClick={() => {
                let slugVal = item.slug.value
                setDeletelLoading(true)
                deleteResource(resource, item.slug.value).then(res => {
                  setDeletelLoading(false)
                  console.log(res)
                  deletedCb(slugVal)
                  setOpen(false)
                }).catch(e => {
                  setDeletelLoading(false)
                  if(e.data && e.data.errors){
                    alert.show({title: 'Delete failed!',
                    body: Object.entries(e.data.errors).map(([key, val]) => `${key} ${val}`)},
                    {type: 'error'})
                  }
                })
              }}
              bgColor={THEME.failure}>Delete</Button>
          </ModalFooter>
        </Modal>
      </ModalWrapper>
      <Overlay visible={open} onClick={() => setOpen(false)}/>
    </ModalPortal>
  </React.Fragment>)
}

const modalRoot = document.getElementById('modal-root');
class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el,);
  }

}

export default DeleteModal
