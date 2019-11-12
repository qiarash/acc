import styled from 'styled-components'
import Button from 'Components/button'
import media from 'Utils/styles'

export const StyledSubmit = styled(Button)`
`
export const StyledInput = styled.input `
  width: 100%;
  border-radius: 4px;
  padding: 10px 12px;
  border: 1px solid ${p => p.hasError
  ? p.theme.failure
  : p.theme.light};
  background: #fff;
  transition: border ease .3s;
  box-shadow: none;
  font-size: 16px;
  text-align: left;
  margin-bottom: ${p => p.hasError
    ? 0
    : '25px'};

  &:focus{
    border: 1px solid ${p => p.hasError
      ? p.theme.errorColor
      : p.theme.inputBorderFocusedColor};
  }

  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #818A91
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
     color:    #818A91
     opacity:  1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
     color:    #818A91
     opacity:  1;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
     color:   #818A91
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
     color:  #818A91
  }

  ::placeholder { /* Most modern browsers support this now. */
     color:   #818A91
  }

`

export const StyledTextarea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  padding: 10px 12px;
  border: 1px solid ${p => p.hasError
  ? p.theme.failure
  : p.theme.light};
  transition: border ease .3s;
  box-shadow: none;
  background: none;
  font-size: 16px;
  text-align: left;
  resize: none;
  max-height: 200px;
  height: 200px;
  margin-bottom: ${p => p.hasError
    ? 0
    : '25px'};
`

export const FieldsWrapper = styled.div `
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: ${p => p.bSide? 1 : 2};

    ${p => p.bSide && `
      padding-left: 25px;
    `}

    ${media.sm`
      padding: 0;
      width: 100%;
    `}
`
export const FormWrapper = styled.div `
  display: flex;
  flex: 1;
  flex-direction: column;

  form {

    .lds-ripple{
      transform: scale(.5);
      position: relative;
      top: -20px;
    }
  }
`

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  ${media.sm`
    flex-direction: column;
  `}
`

export const StyledTitle = styled.div `
  font-size: 47px;
  margin: 26px 0;
  color: ${p => p.theme.dark2};
  text-transform: uppercase;
`

export const LogoWrapper = styled.div `
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  transition: all ease .3s;
  opacity: 1;
  visibility: visible;
  top: 0;

  @media (max-height: 500px) {
    top: -50px;
    opacity: 0;
    visibility: hidden;
  }
`

export const FieldError = styled.span `
  padding: 6px 0 20px;
  font-size: 16px;
  text-align: left;
  align-self: flex-start;
  display: block;
  color: ${p => p.theme.failure}
`

export const FieldTitle = styled.span `
  text-align: left;
  margin-bottom: 8px;
  font-size: 16px;
  align-self: flex-start;
  color: ${p => p.hasError
  ? p.theme.failure
  : p.theme.dark4};
`

export const StyledButton = styled(Button)`
  margin-bottom: ${p => p.hasError
  ? 0
  : '24px'};
  position: relative;
  .button-icon{
    position: absolute;
    left: 10px;
    top: 15px;
    color: ${p => p.theme.primaryColor};
    i {
      font-size: 7px;
    }
  }
`

export const SelectGroup = styled.div `
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Overlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: all ease .3s;
  background: #000;
  z-index: 12;

  ${p => p.isOpen && `
    opacity: .5;
    visibility: visible;
  `}
`
export const SelectBox = styled.div `
  position: fixed;
  top: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
  z-index: 13;
  background: #fff;
  left: 0;
  right: 0;
  transition: all ease .3s;

  ${p => p.isOpen && `
    top: calc(100% - 300px);
  `}
  .header{
    padding: 16px;
    text-align: center;
    position: relative;
    border-bottom: 1px solid ${p => p.theme.inputBorderColor};

    i {
      position: absolute;
      right: 24px;
      top: 24px;
      font-size: 9px;
      color: ${p => p.theme.primaryColor}
    }
  }
  .options{

    max-height: 245px;
    overflow-y: auto;

  }
  .option {
    padding: 24px;
    text-align: center;
    position: relative;

    .option-tick{
      opacity: 0;
      visibility: hidden;
      position: absolute;
      margin-left: 16px;
      transition: all ease .3s;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${p => p.theme.primaryColor};
      display: inline-flex;
      justify-content: center;
      align-items: center;

      i {
        font-size: 10px;
        color: #fff;
      }

      &.active{
        opacity: 1;
        visibility: visible;
      }
    }
  }
`

export const InputWrapper = styled.div `
  position: relative;
  width: 100%;

  input {
    padding-left: 30px;
  }
`
export const FixedTitle = styled.div `
  position: absolute;
  top: 1px;
  height: 46px;
  padding: 12px 16px;
  border-right: 1px solid ${p => p.theme.inputBorderColor};
`
