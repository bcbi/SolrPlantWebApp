import React, { Component } from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Form, FormGroup, Input, Button, FormFeedback} from 'reactstrap'
import { connect } from 'react-redux'
import {Container, Row, Col} from 'reactstrap'


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
    const whiteDivStyle = {
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '20px',
    margin: '0'
    };


    let searchForm = (
      <div style={whiteDivStyle}>
      <Container fluid>
      <Row className="show-Container">
        <h4> Enter search text</h4>
      </Row>
      <Row className="show-Container">
          <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup>
            <Input 
              type = "text"
              invalid = {this.invalidInput()}
              value= {this.state.searchValue}
              onChange={this.onChange}/>
            <FormFeedback> Input text must be ASCII</FormFeedback>
          </FormGroup>
          </Form>
      </Row>
      </Container>
      </div>
    );

    return searchForm;
  }

  // renderFullForm(){

  //   const whiteDivStyle = {
  //   paddingLeft: '50px',
  //   paddingRight: '50px',
  //   margin: '0'
  //   };

  //   let searchForm = this.searchForm()

  //   let resultTable = (
  //     <div style={whiteDivStyle}>
  //     <Container fluid>
  //     <Row className="show-Container">
  //       <h3> Results </h3>
  //     </Row>
  //     <Row className="top-buffer"/>
  //     <Row className="show-Container">
  //       <BootstrapTable exportCSV data={ this.props.searchData } search>
  //       <TableHeaderColumn dataField='Id' width='100px' isKey={ true }>Id</TableHeaderColumn>
  //       <TableHeaderColumn dataField='Name'>Name</TableHeaderColumn>
  //       <TableHeaderColumn dataField='Start' width='100px'>Start</TableHeaderColumn>
  //       <TableHeaderColumn dataField='End' width='100px' >End</TableHeaderColumn>
  //       </BootstrapTable>
  //     </Row>
  //     </Container>
  //     </div>
  //   );

  //   let fullForm = (
  //     <Container fluid>
  //     <Row className="show-Container">
  //       {SearchForm}
  //     </Row>
  //     <Row className="show-Container">
  //       {resultTable}
  //     </Row>
  //     </Container>
  //   );
  //   return fullForm
  // }

  render() {
    return (this.searchForm());
  }


  //  if( this.props.searchData.length !== 0){
  //     return (
  //       this.renderFullForm()
  //     );
  //   }else{
  //     return (
  //       this.renderSeachForm()
  //     );
  //   }
  // }
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
