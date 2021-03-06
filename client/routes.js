import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, Signup, Room, Lobby, Messages, RoomMessages, Drop, SplashScreen } from './components';
import {me} from './store';

class Routes extends Component {
  componentDidMount(){
    this.props.loadInitialData();
  }

  render(){
    const {isLoggedIn, user} = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/room/:roomid" render={(routeProps) => <Room user={user} routeProps={routeProps}/>} />
                  <Route path="*" component={Lobby} />
                  <Route component={Lobby} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={SplashScreen} />
          </Switch>
        </Main>
      </Router>
    )
  }
};

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};