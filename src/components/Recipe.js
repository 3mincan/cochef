return (
    <div className="col-xs-3 jumbotron vertical-center">
    <div className="panel panel-primary text-center ">
      <div className="panel-heading">Create your Account</div>
          <p className="help-block"></p>
      <div className="panel-body">
          <form className="form-horizontal" method="POST">
              <div className="control-group">
                  <div className="controls">
                      <input type="text" onChange={props.handleChange} name="firstname" placeholder="First name" className="input-xlarge"/>
                      <p className="help-block"></p>
                  </div>
              </div>
              <div className="control-group">
                  <div className="controls">
                      <input type="text" id="lastname" onChange={props.handleChange} name="lastname" placeholder="Last name" className="input-xlarge"/>
                      <p className="help-block"></p>
                  </div>
              </div>

              <div className="control-group">
                  <div className="controls">
                      <input type="email" id="email" onChange={props.handleChange} name="email" placeholder="E-Mail" className="input-xlarge"/>
                      <p className="help-block"></p>
                  </div>
              </div>

              <div className="control-group">
                  <div className="controls">
                      <input type="password" id="password" onChange={props.handleChange} name="password" placeholder="Password" className="input-xlarge"/>
                      <p className="help-block"></p>
                  </div>
              </div>

              <div className="control-group">
                  <div className="controls">
                      <button className="btn btn-primary" onClick={props.submit}>Register</button>
                  </div>
              </div>
          </form>
      </div>
</div>
</div>
)
