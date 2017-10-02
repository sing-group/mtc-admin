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

  handleChange = (event) => {
        const value = parseInt(event.target.value)
        const max = this.props.parameter.MAX
        const min = this.props.parameter.MIN
        if (!this.props.parameter.isValid(value)) {
            this.setState({
                errorText : value > max ? this.props.translate('aor.validation.maxValue',{ max }):this.props.translate('aor.validation.minValue',{ min })
                
            })
            return 
        } else
            this.setState({
                errorText : ''
            })
        this.props.onValueChange(event.target.value);
  };
  render() {
      const {parameter, translate, value} = this.props
      console.log("-----------------------------------------------",parameter, value)
    return (
      <div style={{display:'flex', flexDirection: 'column', flexAlign: 'flex-start', backgroundColor : '#f9fafc', margin : 5, padding : 5, boxShadow: "0px 0px 2px 2px #B3E5FC"}}>
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