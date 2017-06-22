import React from 'react';

export default class Recipe extends React.Component {

    render() {
        return (
            <div className="panel panel-primary text-center container-fluid col-lg-8 col-lg-offset-2">
              <div className="panel-heading">You can cook + recipe name</div>
              <div className="panel-body"><a className="recipeimage" href="http://www.food.com/recipe/baked-chicken-111514"><img src="http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/18/89/81/picGdB6S4.jpg" alt=""/></a></div>
              <div className="panel-footer">You also need + ingredient / You've got all the ingredients</div>
            </div>
        );
    }
}
