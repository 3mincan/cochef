import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
// import { Router, Route, Switch } from 'react-router';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="text-center">
        <div className="panel panel-primary container-fluid col-lg-10 col-lg-offset-1">
          <div className="panel-heading">
            <h3 className="panel-title">What do you have?</h3>
          </div>
          <div className="row">
          <div className="panel-body col-lg-4">
            <div className="panel panel-default">
                 <a data-toggle="collapse" href="#collapse1" className="panel-heading">Dairy</a>
                     <div id="collapse1" className="panel-collapse collapse">
                     <div className="panel-body checkbox"><label><input type="checkbox"/>Butter</label></div>
                     <div className="panel-body checkbox"><label><input type="checkbox"/>Eggs</label></div>
                     <div className="panel-body checkbox"><label><input type="checkbox"/>Milk</label></div>
                      </div>
                    </div>
          </div>
          <div className="panel-body col-lg-4">
            <div className="panel panel-default">
                 <a data-toggle="collapse" href="#collapse2" className="panel-heading">Meats</a>
                     <div id="collapse2" className="panel-collapse collapse">
                        <div className="panel-body checkbox"><label><input type="checkbox"/>Bacon</label></div>
                        <div className="panel-body checkbox"><label><input type="checkbox"/>Sausage</label></div>
                        <div className="panel-body checkbox"><label><input type="checkbox"/>Ham</label></div>
                      </div>
                    </div>
          </div>
          <div className="panel-body col-lg-4">
            <div className="panel panel-default">
                 <a data-toggle="collapse" href="#collapse3" className="panel-heading">Type of Good</a>
                     <div id="collapse3" className="panel-collapse collapse">
                      <div className="panel-body">Name of Good</div>
                      </div>
                    </div>
          </div>
      </div>
      <div className="row">
          <button type="submit" className="btn btn-primary">What can I cook?</button>
      </div>
      <p className="help-block"></p>
        </div>
    </div>
        );
    }
}
