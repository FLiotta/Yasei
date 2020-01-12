import React, { Component } from 'react';
import { connect } from 'react-redux';
import { discoverPosts, restartState } from '../actions/posts';
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
    }

    componentWillUnmount() {
        this.props.restartState();
    }

    render() {
        return (
          <div className="container my-5">
              <h2 className="montserrat">Discover users</h2>
              <div className="d-inline-flex flex-row w-100 mb-5" style={{'overflowX': 'scroll', 'overflowY': 'hidden', 'minHeight': '100px'}}>
              </div>
              <h2 className="montserrat">Explore posts</h2>
              <div className="row mt-5">
              <BottomScrollListener onBottom={this.props.discoverPosts}>
                  {this.props.posts.map((post, i) =>
                      <div className='col-12 col-md-6' key={post._id + i}>
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

/*<div className="container my-5">
    <h2 className="montserrat">Discover users</h2>
    <div className="d-inline-flex flex-row w-100 mb-5" style={{'overflowX': 'scroll', 'overflowY': 'hidden', 'minHeight': '100px'}}>
        {this.props.usersLoading && <div className="d-flex justify-content-center m-auto"><Loading /></div>}
        {this.props.users.map(user =>
            <div className={'mx-5 px-5'} key={user._id}>
                <UserCard {...user} />
            </div>
        )}
    </div>
    <h2 className="montserrat">Explore posts</h2>
    <div className='row'>
    <BottomScrollListener onBottom={this.props.discoverPosts}>
        {this.props.posts.map(post =>
            <div className='col-12 col-md-6' key={post._id}>
                <Post {...post} />
            </div>
        )}
    </BottomScrollListener>
    </div>
</div>*/

const stateToProps = state => ({
    posts: state.posts.items,
    postsLoading: state.posts.loading
})

const dispatchToProps = dispatch => ({
    discoverPosts: () => dispatch(discoverPosts()),
    restartState: () => dispatch(restartState())
})

export default connect(stateToProps,dispatchToProps)(Explore);
