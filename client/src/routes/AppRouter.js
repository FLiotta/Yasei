import React, { Component, Fragment, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Profile = lazy(() => import('../pages/Profile'));
const Error = lazy(() => import('../pages/Error'));
const Explore = lazy(() => import('../pages/Explore'));
const NewPostModal = lazy(() => import('../components/NewPostModal'));
const SettingsModal = lazy(() => import('../components/SettingsModal'));
const Navbar = lazy(() => import('../components/Navbar'));

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Fragment>
              <div className="d-flex page">
                <NewPostModal />
                <SettingsModal />
                <Route path="/explore" component={Explore} />
                <Route path="/u/:id" component={Profile} />
                <Navbar />
              </div>
            </Fragment>
            <Route component={Error} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default AppRouter;
