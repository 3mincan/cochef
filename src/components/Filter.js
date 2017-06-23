import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { typeofgood: '', nameofgood: '', recipe:'' };
        this.renderTypeOfGood = this.renderTypeOfGood.bind(this);
        this.selectedGoods = [];
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
        // var goodName= e.target.id;
        // const goodId = this.state;
        let goodId = [];
        for (let i = 0; i < this.state.typeofgood.length; i++) {
            console.log(this.state.typeofgood[i].good_name, e.target.id);
            // if (this.state.typeofgood[i].good_name == e.target.id) {
            //     let goodId = this.state.typeofgood[i].good_id
            //     browserHistory.push('/recipe/' + goodId)
            // }
            if (this.selectedGoods.includes(this.state.typeofgood[i].good_name)) {
                goodId.push(this.state.typeofgood[i].good_id)
            }
        }
        browserHistory.push('/recipe/' + goodId)

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
                        <div className="panel-body col-lg-8 col-lg-offset-2">
                          <div className="panel panel-default">
                              <a data-toggle="collapse" href={'#' + item} className="panel-heading" onClick={this.getNameofGoods}>{item}</a>
                              <div id={item} className="panel-collapse collapse">
                                  {goodsByType[item].map((good) => {
                                      return <div className="panel-body checkbox"><label><input type="checkbox" onClick={() => {this.selectedGoods.push(good)} }/>{good}</label></div>
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
