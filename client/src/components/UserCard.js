import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class UserCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'user-card position-relative my-5 ' + this.props.class}>
        <img src={this.props.profilePic} className="rounded-circle user-card__image bg-brand" />
        <div className="user-card__body">
          <div className="user-card__body__info d-flex justify-content-center d-md-block">
            <h3 className="user-card__body__username montserrat">{this.props.username}</h3>
            <p className="mb-3 d-none d-md-block user-card__body__info__description montserrat">{this.props.description}</p>
          </div>
          <div className="user-card__body__actions d-flex justify-content-center d-md-block">
            <Link to={'/u/' + this.props.username}>
              <button className="btn btn-brand btn-sm rounded-pill text-white px-3">VIEW</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard;
