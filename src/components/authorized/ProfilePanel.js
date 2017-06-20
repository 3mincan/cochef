import React, {Component} from 'react';
import NavBarReg from './NavBarReg';


export default class ProfilePanel extends Component {
    constructor(props) {
        super(props);
    }

    // getInitialState: function() {
    //   return {
    //     jobs: []
    //   }
    // },
    //
    // componentDidMount: function() {
    //   // Is there a React-y way to avoid rebinding `this`? fat arrow?
    //   var th = this;
    //   this.serverRequest =
    //     axios.get(this.props.source)
    //       .then(function(result) {
    //         th.setState({
    //           jobs: result.data.jobs
    //         });
    //       })
    // },
    //
    // componentWillUnmount: function() {
    //   this.serverRequest.abort();
    // },

    render () {
        return (
            <div className="container">
            	<div className="row">
                    <div className="col-lg-10 col-md-5 col-sm-8 col-xs-9 bhoechie-tab-container">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 bhoechie-tab-menu">
                          <div className="list-group">
                            <a href="#" className="list-group-item text-center">
                              <h4 className="glyphicon glyphicon-home"></h4><br/>
                              <h6>Personal Info</h6>
                            </a>
                            <a href="#" className="list-group-item active text-center">
                              <h4 className="glyphicon glyphicon-star"></h4><br/>
                              <h6>Starred</h6>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">

                            <div className="bhoechie-tab-content">
                                <center>
                                  <h1 className="glyphicon glyphicon-home"></h1>
                                      <h2>Personal Info</h2>
                                      <div className="tab-pane" id="Registration">
                                          <form role="form" className="form-horizontal">
                                          <div className="form-group">
                                              <label for="firstname" className="col-sm-2 control-label">First Name</label>
                                              <div className="col-sm-10">
                                                  <input type="text" name="firstname" onChange={this.handleInput} className="form-control" placeholder="First Name" />
                                              </div>
                                          </div>
                                          <div className="form-group">
                                              <label for="lastname" className="col-sm-2 control-label">Last Name</label>
                                              <div className="col-sm-10">
                                                  <input type="text" name="lastname" onChange={this.handleInput} className="form-control" placeholder="Last Name" />
                                              </div>
                                          </div>
                                          <div className="form-group">
                                              <label for="email" className="col-sm-2 control-label">E-mail</label>
                                              <div className="col-sm-10">
                                                  <input type="email" name="email" onChange={this.handleInput} className="form-control" id="email" placeholder="E-mail" />
                                              </div>
                                          </div>
                                          <div className="form-group">
                                              <label for="password" className="col-sm-2 control-label">Password</label>
                                              <div className="col-sm-10">
                                                  <input type="password" name="password" onChange={this.handleInput} className="form-control" id="password" placeholder="Password" />
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-sm-2">
                                              </div>
                                              <div className="col-sm-10">
                                                  <button type="button" onClick={this.registerSubmit} className="btn btn-primary btn-sm">Save & Continue</button>
                                                  <button type="button" className="btn btn-default btn-sm">Cancel</button>
                                              </div>
                                          </div>
                                          <p className="help-block"></p>
                                          </form>
                                      </div>
                                </center>
                            </div>

                            <div className="bhoechie-tab-content active">
                                <center>
                                  <h1 className="glyphicon glyphicon-star" ></h1>
                                  <h2>Starred Recipes</h2>
                                </center>
                            </div>

                        </div>
                    </div>
              </div>
            </div>
        )
    }
}
