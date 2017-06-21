import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';

export default class AddRecipeForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center panel panel-primary container-fluid col-lg-10 col-lg-offset-1">
                <div className="panel-heading">
                    <h3 className="panel-title">Send us your recipes</h3>
                </div>
                <p className="help-block"></p>
            <form>
                <div className="row">
                <div className="form-group">
                  <label name="recipename" className="col-lg-2 control-label">Name</label>
                  <div className="col-lg-10">
                    <input type="text" className="form-control" id="recipename" placeholder="Name of your Recipe" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="diet" className="col-lg-2 control-label">Is it Vegan or Vegetarian?</label>
                  <label>
                    <input type="checkbox" className="col-lg-offset-2" id="diet" name="vegan" /> Vegan
                  </label>
                  <label>
                    <input type="checkbox" className="col-lg-offset-2" id="diet" name="vegetarian" /> Vegetarian
                  </label>
                </div>
                <div className="form-group">
                  <label for="textArea" className="col-lg-2 control-label">Textarea</label>
                  <div className="col-lg-10">
                    <textarea className="form-control" rows="3" id="textArea"></textarea>
                    <span className="help-block">A longer block of help text that breaks onto a new line and may extend beyond one line.</span>
                  </div>
                </div>
                <div className="form-group">
                  <label for="select" className="col-lg-2 control-label">Serving</label>
                  <div className="col-lg-10">
                    <select className="form-control" id="select">
                      <option>2</option>
                      <option>4</option>
                      <option>6</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label name="cals" className="col-lg-2 control-label">Cals</label>
                  <div className="col-lg-10">
                    <input type="number" className="form-control" id="cals" placeholder="Cals of your Recipe" />
                  </div>
                </div>
                <div className="form-group">
                  <label name="link" className="col-lg-2 control-label">Have you ever saw this recipe online? If yes, Can you please share the link with us?</label>
                  <div className="col-lg-10">
                    <input type="url" className="form-control" id="link" placeholder="Link for your Recipe" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button type="reset" className="btn btn-default">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                        <p className="help-block"></p>
                  </div>
                </div>
            </div>
            </form>
        </div>
        );
    }
}
