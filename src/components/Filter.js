import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
// import { Router, Route, Switch } from 'react-router';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { typeofgood: '', nameofgood: '', recipe:'' };
        this.renderTypeOfGood = this.renderTypeOfGood.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllTypeofGoods').then((res) => {
            // console.log('All Type of Goods:', res.data.results);
            this.setState({ typeofgood: res.data.results }, function() {
                // console.log('state.set', this.state.typeofgood);
            })
        })
    }

    getRecipes(e) {
        axios.get('/getrecipe').then((res) => {
            console.log('All recipes:', res.data.results);
            this.setState({ recipes: res.data.results }, function() {
                // console.log('state.set', this.state.typeofgood);
            })
        })
    }



    renderTypeOfGood() {
        if(this.state.typeofgood) {
            let goodsByType = {};

            this.state.typeofgood.forEach(function(typeofgood) {
                if (!goodsByType[typeofgood.typeofgood_name]) {
                    goodsByType[typeofgood.typeofgood_name] = [];
                }
                goodsByType[typeofgood.typeofgood_name].push(typeofgood.good_name);
            });
            // console.log(goodsByType);

            let typesOfGood = Object.keys(goodsByType);



            return typesOfGood.map((item) => {
                // console.log(item);
                return (
                    <div className="row">
                        <div className="panel-body col-lg-4">
                          <div className="panel panel-default">
                              <a data-toggle="collapse" href={'#' + item} className="panel-heading" onClick={this.getNameofGoods}>{item}</a>
                              <div id={item} className="panel-collapse collapse">
                                  {goodsByType[item].map(function(good) {
                                      return <div className="panel-body checkbox"><label><input type="checkbox"/>{good}</label></div>
                                  })}
                              </div>
                          </div>
                        </div>
                    </div>
                )
            });
        }
    }

    render() {
        return (
            <div className="text-center panel panel-primary container-fluid col-lg-6 col-lg-offset-3">
              <div className="panel-heading">
                <h3 className="panel-title">What do you have?</h3>
              </div>

              {this.state.typeofgood && this.renderTypeOfGood()}

              <div className="row">
                  <button type="submit" onClick={this.getRecipes} className="btn btn-primary">What can I cook?</button>
              </div>
              <p className="help-block"></p>
            </div>

        )
    }
}
