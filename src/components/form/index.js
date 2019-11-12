import React, {Component} from 'react'
import {validateField, isEmpty, capitalize} from "Utils"
import {fieldTypes} from "Root/models"
import List from "./List"
import {
  StyledTitle,
  FieldError,
  FormWrapper,
  FieldTitle,
  InputWrapper,
  FixedTitle,
  StyledTextarea,
  StyledInput,
  FieldsWrapper,
  SectionWrapper,
  StyledSubmit
} from './styled'

const bSide = [fieldTypes.list]

class Form extends Component {

  static defaultProps = {
    fields: [],
    title: '',
    submitButtonText: 'Submit',
    onSubmit: () => {}
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.initializeForm = this.initializeForm.bind(this)
    this.state = {}

  }

  componentDidMount() {
    console.log('mount')
    this.initializeForm()
  }

  initializeForm() {
    const {data} = this.props
    let fields = Array.from(this.props.fields)
    console.log('====props.fields', fields)
    let values = {}
    if (data && !fields.length) {
      let entries = Object.entries(data)
      for (let i = 0; i < entries.length; i++) {
        let [key, val] = entries[i]
        if (!val.hiddenInForm)
          fields.push({
            name: key,
            placeholder: capitalize(val.fieldLabel || key),
            value: val.value || '',
            type: val.type,
            required: val.required,
            order: val.formOrder || 0,
            resource: val.resource
          })
      }
      fields.sort((a, b) => a.order - b.order)
    }

    for (let i = 0; i < fields.length; i++) {
      let fld = fields[i]
      console.log(fld.value)
      values[fld.name] = fld.value || ''
    }

    this.setState({fields, values})
  }

  componentDidUpdate(prevProps) {
    if (this.props.data && this.props.data.slug && this.props.data.slug.value !== prevProps.data.slug.value)
      this.initializeForm()
    if (prevProps.errorInResponse !== this.props.errorInResponse) {
      this.setState({loading: false})
    }
  }

  handleChange({field, value}) {
    let errors = validateField(this.state.fields.find(f => f.name === field), value)
    this.setState({
      values: {
        ...this.state.values,
        [field]: value
      },
      fields: this.state.fields.map(f => {
        if (f.name === field)
          return {
            ...f,
            errors
          }
        return f
      })
    })
  }

  handleSubmit(e) {
    if (e)
      e.preventDefault()
    if (this.state.loading)
      return
    let clonedInputs = Array.from(this.state.fields);
    for (let i = 0; i < clonedInputs.length; i++) {
      let field = clonedInputs[i];
      field.errors = []
      let fieldValue = this.state.values[field.name] || field.value;
      field.errors = validateField(field, fieldValue)
      field.error = field.errors.length > 0
    }

    if (clonedInputs.find(field => field.error)) {
      this.setState({fields: clonedInputs});
      return;
    }
    this.setState({loading: true})
    let values = Object.entries(this.state.values)
    let payload = {}
    for (var i = 0; i < values.length; i++) {
      let [key, val] = values[i]
      if (!this.props.allowPartial || (!isEmpty(val) && val !== this.props.fields.find(f => f.name === key).value))
        payload[key] = val
    }
    return this.props.onSubmit(payload)
  }

  render() {
    const {fields, loading} = this.state
    const {submitButtonText, title, extra, submitButtonFullWidth} = this.props
    let bSideInputs = fields && fields.filter(f => bSide.includes(f.type))
    return (<FormWrapper>
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <SectionWrapper>
        <FieldsWrapper>
          {title !== '' && <StyledTitle>{title}</StyledTitle>}
          {fields && fields.filter(f => !bSide.includes(f.type)).map(f => (<InputHolder f={f}
            key={f.name}
            value={this.state.values[f.name]}
            change={this.handleChange}/>))}
        </FieldsWrapper>
        {bSideInputs && bSideInputs.length > 0 && <FieldsWrapper bSide>
          {fields && bSideInputs.map(f => (<InputHolder f={f}
            key={f.name}
            value={this.state.values[f.name]}
            change={this.handleChange}/>))}
          </FieldsWrapper>}
        </SectionWrapper>
        {extra && extra}
        <StyledSubmit styles={{
            height: 35,
            width: submitButtonFullWidth?'100%':100,
            paddingTop: 8
          }} loading={loading} styleType='primary' type="submit">{submitButtonText}</StyledSubmit>
      </form>
    </FormWrapper>)
  }
}

const InputHolder = ({f, value, change}) => {
  let inputProps = {
    ...f,
    name: f.name,
    options: f.options,
    hasError: f.errors && f.errors.length > 0,
    value,
    onChange: ({target}) => change({field: target.name, value: target.value}),
    type: f.type || 'text',
    placeholder: f.placeholder || '',
    fixedTitle: f.fixedTitle
  }
  return (<React.Fragment>
    <FieldTitle hasError={inputProps.hasError}>
      {f.placeholder}
    </FieldTitle>
    <Input {...inputProps}/> {
      f.errors && f.errors.slice(0, 1).map((e, index) => (<FieldError key={index}>
        {e.desc}
      </FieldError>))
    }
  </React.Fragment>)
}

const Input = (props) => {
  switch (props.type) {
      case fieldTypes.list:
        return (<List {...props}/>)
      case fieldTypes.longString:
        return (<StyledTextarea {...props}>{props.value}</StyledTextarea>)
    default:
      if (props.fixedTitle)
        return (<InputWrapper>
          <StyledInput {...props}/>
          <FixedTitle>{props.fixedTitle}</FixedTitle>
        </InputWrapper>)
      return (<StyledInput {...props}/>)

  }
}

export default Form
