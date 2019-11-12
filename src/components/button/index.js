import React from 'react'
import styled from 'styled-components'
import Loading from 'Components/loading'
import {darken} from 'polished'
import PropTypes from 'prop-types'

const StyledButton = styled.button `
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  width: ${p => p.width || '100%'};
  background: ${p =>
   p.styleType === 'primary'
    ? p.theme.primary
    : p.styleType === 'secondary'
      ? 'transparent'
      : p.bgColor};
  color: ${p => p.styleType === 'primary'
        ? '#fff'
        : p.styleType === 'secondary'
          ? p.theme.secondary
          : p.color};
  border-radius: 4px;
  transition: all ease .1s;

  &:active{

    background: ${p => darken(
            .1, p.styleType === 'primary'
            ? p.theme.primary
            : p.styleType === 'secondary'
              ? p.theme.dark4
              : p.bgColor)}
  }

  ${p => p.disabled && `opacity: .5`};

  border: 1px solid ${p => p.styles === 'secondary'
            ? p.theme.secondary
            : p.borderColor || p.color || p.theme.primaryColor};

`

let Button = ({
  children,
  loading,
  disabled,
  onClick,
  styles,
  icon,
  ...props
}) => {
  return (<StyledButton {...props} style={styles} disabled={disabled} onClick={() => {
      if (loading || disabled)
        return null
      onClick()
    }}>
    {
      loading
        ? <Loading light/>
        : <React.Fragment>
            {icon && <span className="button-icon">{icon}</span>}
            {children}
          </React.Fragment>
    }
  </StyledButton>)
}

Button.defaultProps = {
  styleType: 'secondary',
  styles: {},
  className: '',
  type: 'button',
  onClick: () => null,
  disabled: false,
  loading: false,
  withBorder: false,
  width: null,
  bgColor: '#f1f1f1'
}

Button.propTypes = {
  styleType: PropTypes.oneOf(['primary', 'secondary', 'none']),
  styles: PropTypes.shape(),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  withBorder: PropTypes.bool,
  width: PropTypes.any,
  bgColor: PropTypes.string
}

export default Button
