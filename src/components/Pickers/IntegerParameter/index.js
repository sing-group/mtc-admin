import React from 'react'

import { translate } from 'admin-on-rest'

import {parseids} from '../../../utils/parseKeys'

import TextField from 'material-ui/TextField';


const Input = translate(class TextFieldExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
    };
  }
  componentDidMount() {
    this.check(this.props.value)
  }

  check = (v) => {
    console.log("CHEKING ", v)
    const value = parseInt(v)
    const max = this.props.parameter._max
    const min = this.props.parameter._min
    if (!this.props.parameter.isValid(value)) {
        this.setState({
            errorText : value > max ? this.props.translate('aor.validation.maxValue',{ max }):this.props.translate('aor.validation.minValue',{ min })
            
        })
    } else
        this.setState({
            errorText : ''
        })
  }
  handleChange = (event) => {
        this.check(event.target.value)
        this.props.onValueChange(parseInt(event.target.value));
  };
  render() {
      const {parameter, translate, value} = this.props
    return (
      <div style={{display:'flex', flexDirection: 'column', flexAlign: 'flex-start', backgroundColor : '#f9fafc', margin : 5, padding : 5, boxShadow: this.state.errorText?  "0px 0px 2px 2px red" : "0px 0px 2px 2px #B3E5FC"}}>
        <span>{translate("common.model.games."+parseids(parameter.descriptionId))}</span>
        <TextField
        style={{marginBottom: this.state.errorText? 15 : 0}}
        value={value} 
        errorText={this.state.errorText}
        onChange={this.handleChange}
        type="number"
        floatingLabelText={translate("common.model.games."+parseids(parameter.nameId))}
        floatingLabelFixed={true}
      />
      
      </div>
    );
  }
})

export default ({ value, parameter,onValueChange}) => (
    <Input value={value} parameter={parameter} onValueChange={(v) => onValueChange(v)}/>
)