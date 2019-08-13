import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  thisHostFromProps = () => {
    return this.props.host.props.host;
  }

  state = {
    options: [
      {key: "some_area", text: "Some Area", value: "some_area"},
      {key: "another_area", text: "Another Area", value: "another_area"}
    ],
    value: "some_area",
    checked: this.thisHostFromProps().active
    // This state is just to show how the dropdown component works.
    // Options have to be formatted in this way (array of objects with keys of: key, text, value)
    // Value has to match the value in the object to render the right text.

    // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  }



  handleChange = (e, {value}) => {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    // console.log(value);
    if (this.state.value !== value) {
      const host = this.thisHostFromProps();
      this.props.moveHost(host, value);  
    }
  }

  toggle = (e, data) => {
    console.log("The radio button fired");
    const value = !(this.state.checked);
    const host = this.thisHostFromProps();
    this.setState({checked: value});
    this.props.toggleActive(host, value);
  }


  render(){
    const areas = this.props.getAreas();
    // console.log(areas)
    // areas.then(a => console.log(a))
    const areasProcessed = areas.map(area => {
      return { key: area.name, text: area.name, value: area.name}
    })
    // this.setState({options: areasProcessed});
    const thisHost = this.thisHostFromProps();

    // console.log(this.props);
    // console.log(thisHost)
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ thisHost.imageUrl }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {thisHost.firstName} | { thisHost.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
                { /* Think about how the above should work to conditionally render the right First Name and the right gender Icon */ }
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={"Active"}
                  /* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */
                  checked={this.state.checked}
                  /* Checked takes a boolean and determines what position the switch is in. Should it always be true? */
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={thisHost.area}
                options={areasProcessed}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
