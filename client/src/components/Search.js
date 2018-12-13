import React, { Component } from 'react';
import {Form, FormGroup, Input, Button, FormFeedback, Label, FormText, Table} from 'reactstrap'
import { connect } from 'react-redux'

const tableStyles = [
 {
  paddingLeft: '50px',
  paddingRight: '50px',
  paddingTop: '20px',
  margin: '0'
  },
  {
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '20px',
    margin: '0',
    backgroundColor: '#f6f6f6'
  }
]

class Search extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
    this.onClear = this.onClear.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.invalidInput = this.invalidInput.bind(this)

    this.state = { searchValue: "", errorMsg: ""}

  }
  onChange(e)
  {
     this.setState({ searchValue: e.target.value });
  }

  onClear(e)
  {
    this.setState({ searchValue: "" });
  }

  onSubmit(e)
  {
    //prevents full page reload
    e.preventDefault();
    if(this.state.searchValue ===""){
      //do nothing for now
    }
    else {
      console.log('====================================');
      console.log("here");
      console.log('====================================');
      this.props.fetchData({text: this.state.searchValue})
    }
  }

  invalidInput(){
    let str = this.state.searchValue
    if(typeof(str)!=='string'){
      return true;
    }
    if (str === ""){
      return null;
    }

    for(var i=0;i<str.length;i++){
      let code = str.charCodeAt(i)
        if(code>127){
            return true
        }
    }
    return false
  }


  searchForm(){

    const greyDivStyle = {
      backgroundColor: '#f6f6f6',
      padding: '50px',
      margin: '0'
    };

    return (
      <div style={greyDivStyle}>
      <Form>
        <FormGroup>
          <Label> <h3> Enter search text </h3> </Label>
          <Input 
            invalid = {this.invalidInput()}
            value= {this.state.searchValue}
            onChange={this.onChange}
            type="textarea"
            placeholder="E.g This sentence contains Raulfia serpentina, Mangifera indica and Arabidoopsis thaliana of plantae, glycine and fabaceae family in it"/>
          <FormFeedback>Invalid Input</FormFeedback>
          <FormText>Input text must be ASCII.</FormText>
        </FormGroup>
        <Button type="submit" onClick={ this.onSubmit }>
                 Submit
        </Button>
        {' '}
        <Button type="button" onClick={ this.onClear }>
            Clear
        </Button>
      </Form> 
      </div>
    );

  }

  tableForm(i){
  
    let thisStyle = tableStyles[i%2]
    console.log("Results: ", i)
    let resultTable =(
      <div style={thisStyle} key={i}>
      <Table>
      <tbody>
        <tr>
          <th width="50%" scope="row">Name Submitted</th>
          <td>{this.props.searchData[i].NameSubmitted}</td>
        </tr>
        <tr>
          <th width="50%" scope="row">Name Matched</th>
          <td>{this.props.searchData[i].NameMatched}</td>
        </tr>
        <tr>
          <th width="50%" scope="row">Accepted Name</th>
          <td>{this.props.searchData[i].AcceptedName}</td>
        </tr>
        <tr>
          <th width="50%" scope="row">Taxonomic Status</th>
          <td>{this.props.searchData[i].TaxonomicStatus}</td>
        </tr>
        <tr>
          <th width="50%" scope="row">uBiotaID</th>
          <td>{this.props.searchData[i].uBiotaID}</td>
        </tr>
      </tbody>
    </Table>
    </div>
    );

    return resultTable

  }

  renderFullForm(){

    let resultTables = []

    for (var i = 0; i < this.props.searchData.length; i++) {
      resultTables.push(this.tableForm(i));
    }

    let fullForm = (
      <div>
      {this.searchForm()}
      <Label style={tableStyles[0]}> <h3> Results </h3> </Label>
        {resultTables}
      </div>
    );
    return fullForm
  }

  render() {
     if( this.props.searchData.length !== 0){
      return (
        this.renderFullForm()
      );
    }else{
      return (
        this.searchForm()
      );
    }
  }
 
}

function mapStatetoProps(state){
  return {
    searchData: state.searchData
  }
}


function mapDispatchToProps(dispatch){
  return {
    fetchData: text => dispatch({type: 'FETCH_SEARCH_DATA', payload:text}),
  }
}

const ConnectedSearch = connect(mapStatetoProps, mapDispatchToProps)(Search)

export default ConnectedSearch
