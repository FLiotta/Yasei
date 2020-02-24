import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import Loading from '../components/Loading';
import { toggleProfilePrivacy, toggleSettingsModal } from '../actions/app';

import 'rodal/lib/rodal.css';

class SettingsModal extends Component {
  constructor(props) {
    super(props);

    this.toggleProfilePrivacy = this.toggleProfilePrivacy.bind(this);
  }

  toggleProfilePrivacy() {
    if(!this.props.loading) {
      this.props.toggleProfilePrivacy();
    }
  }

  render() {
    const modalCustomStyles = {
      height: 'fit-content'
    };

    return (
      <Rodal
            visible={this.props.isVisible}
            onClose={this.props.toggleSettingsModal}
            animation={'slideUp'}
            customStyles={modalCustomStyles}>
            <h4 className="mb-3">Settings</h4>
            {this.props.loading
              ? <Loading />
              : <div className="custom-control custom-switch" onClick={this.toggleProfilePrivacy}>
                <input type="checkbox" className="custom-control-input" id="customSwitch1" checked={this.props.profilePrivacy} />
                <label className="custom-control-label" htmlFor="customSwitch1">Allow people to post on my profile.</label>
              </div>
            }
      </Rodal>
    );
  }
}

const stateToProps = state => ({
  profilePrivacy: state.app.logged.openProfile,
  loading: state.app.settingsModal.loading,
  isVisible: state.app.settingsModal.isVisible
});

const dispatchToProps = dispatch => ({
  toggleProfilePrivacy: () => dispatch(toggleProfilePrivacy()),
  toggleSettingsModal: () => dispatch(toggleSettingsModal())
})

export default connect(stateToProps, dispatchToProps)(SettingsModal);
