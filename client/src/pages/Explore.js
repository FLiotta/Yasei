import React, { Component } from 'react';
import { connect } from 'react-redux';
import { discoverPosts, restartState as restartStatePosts } from '../actions/posts';
import { discoverUsers, restartState as restartStateUsers } from '../actions/users';
import UserCard from '../components/UserCard';
import Post from '../components/Post';
import Loading from '../components/Loading';
import BottomScrollListener from 'react-bottom-scroll-listener';

class Explore extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.discoverPosts();
        this.props.discoverUsers();
    }

    componentWillUnmount() {
        this.props.restartState();
    }

    render() {
        return (
          <div className="container my-5">
              <h2 className="montserrat">Discover users</h2>
              <div className="d-inline-flex flex-row w-100 mb-5" style={{'overflowX': 'scroll', 'overflowY': 'hidden', 'minHeight': '100px'}}>
                {this.props.usersLoading && <div className="d-flex justify-content-center m-auto"><Loading /></div>}
                {this.props.users.map(user =>
                    <div className={'mx-3 mx-md-5 px-md-5 animated fadeIn'} key={user._id}>
                        <UserCard {...user} />
                    </div>
                )}
              </div>
              <h2 className="montserrat">Explore posts</h2>
              <div className="row mt-5">
              <BottomScrollListener onBottom={this.props.discoverPosts}>
                  {this.props.posts.map((post, i) =>
                      <div className='col-12 col-md-6 animated fadeIn' key={post._id + i}>
                          <Post {...post} />
                      </div>
                  )}
                  {this.props.postsLoading && <div className="d-flex justify-content-center m-auto my-5 py-5"><Loading /></div>}
              </BottomScrollListener>
              </div>
          </div>
        )
    }
}

const stateToProps = state => ({
    posts: state.posts.items,
    postsLoading: state.posts.loading,
    users: state.users.items,
    usersLoading: state.users.loading
})

const dispatchToProps = dispatch => ({
    discoverPosts: () => dispatch(discoverPosts()),
    discoverUsers: () => dispatch(discoverUsers()),
    restartState: () => {
      dispatch(restartStatePosts());
      dispatch(restartStateUsers());
    }
})

export default connect(stateToProps,dispatchToProps)(Explore);
