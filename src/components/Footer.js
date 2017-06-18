import React from 'react';

export default class Footer extends React.Component {

    render() {
        return (
            <div className="footer navbar-fixed-bottom">
                <footer>
                 <div className="container">
                   <div className="row text-center">

                             <div className="col-md-6 col-sm-6 col-xs-12">
                              <ul className="list-inline">

                                           <li>
                                                <a href="https://facebook.com/e.demirkaya"><i className="fa fa-facebook fa-2x"></i></a>
                                           </li>

                                           <li>
                                                <a href="https://twitter.com/3mincan"><i className="fa fa-twitter fa-2x"></i></a>
                                           </li>

                                           <li>
                                                <a href="#"><i className="fa fa-linkedin fa-2x"></i></a>
                                           </li>

                                           <li>
                                                <a href="#"><i className="fa fa-tumblr fa-2x"></i></a>
                                           </li>

                                 </ul>
                               </div>

                             <div className="col-md-6 col-sm-6 col-xs-12">
                              <ul className="menu list-inline">

                                     <li>
                                        <a href="#">Home</a>
                                      </li>

                                      <li>
                                        <a href="#">Contact</a>
                                     </li>

                             </ul>
                           </div>


                       </div>
                    </div>
                </footer>
            </div>

        );
    }
}
