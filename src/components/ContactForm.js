import React from 'react';

export default class ContactForm extends React.Component {

    render() {
        return (
            <div className="text-center">
        <div className="panel panel-primary container-fluid col-lg-4 col-lg-offset-4">
          <div className="panel-heading">
            <h3 className="panel-title">Contact Us</h3>
          </div>
<form className="form-horizontal">
  <fieldset>
      <span className="help-block"></span>
      <div className="form-group">
        <label for="inputName" className="col-lg-2 control-label">Your Name</label>
        <div className="col-lg-10">
          <input type="name" className="form-control" id="inputName" placeholder="Your Name"/>
        </div>
      </div>
    <div className="form-group">
      <label for="inputEmail" className="col-lg-2 control-label">Email</label>
      <div className="col-lg-10">
        <input type="text" className="form-control" id="inputEmail" placeholder="Email"/>
      </div>
    </div>
    <div className="form-group">
      <label for="textArea" className="col-lg-2 control-label">Message</label>
      <div className="col-lg-10">
        <textarea className="form-control" rows="3" id="textArea"></textarea>
        <span className="help-block">Whether you’re looking for answers, would like to solve a problem, or just want to let us know how we did, you’ll find many ways to contact us right here.</span>
      </div>
    </div>
    <div className="form-group">
      <div className="col-lg-10 col-lg-offset-2">
        <button type="reset" className="btn btn-default">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </div>
  </fieldset>
</form>
</div>
</div>
);
}
}
