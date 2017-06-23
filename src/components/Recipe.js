import React from 'react';
import axios from 'axios';
import Filter from './Filter';

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = { typeofgood: '', nameofgood: '', recipe:'' };
    }

    componentDidMount() {
        var goodId = this.props.params.id;
        console.log(this.props.params.id);
        axios.get('/getrecipe?goodId=' + this.props.params.id).then((res) => {
        console.log('All recipes:', res.data.results);
            this.setState({ recipes: res.data.results })
        })
    }
    render() {
        if (!this.state.recipes) {
            return null
        }
        return (
            <div>
                {this.state.recipes.map((recipe) => {
                    return (
                        <div className="panel panel-primary text-center container-fluid col-lg-8 col-lg-offset-2">
                          <div className="panel-heading">You can cook {recipe.recipe_name}</div>
                          <div className="panel-body recipeimage"><a target="_blank" href={recipe.url}><img className="recipeimage" src={recipe.imgurl} alt={recipe.recipe_name} /></a></div>
                        </div>
                    )
                })}
            </div>

        );
    }
}
