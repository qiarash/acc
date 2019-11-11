import { css } from 'styled-components'
const sizes = {
   lg: 1000,
   md: 992,
   sm: 700,
   xs: 400
}
export default Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {})
