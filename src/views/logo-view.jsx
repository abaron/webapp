/* This is just a static page to display when no conversation is selected. */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Tinode from 'tinode-sdk';

import { APP_NAME } from '../config.js';

export default class LogoView extends React.PureComponent {
  render() {
    var version = APP_NAME + ' (' + Tinode.getLibrary() + ')';
    return (
      <div id="dummy-view" className={this.props.hideSelf ? 'nodisplay' : null}>
        <div>
          <a href="javascript:void();">
            <img id="logo" alt="logo" src="img/logo.svg" />
            <h2>Adira Chat Web</h2>
          </a>
          <p className={ 'nodisplay' }><FormattedMessage id="label_client" defaultMessage="Client:" /> {version}</p>
          <p className={ 'nodisplay' }><FormattedMessage id="label_server" defaultMessage="Server:" /> {this.props.serverVersion} ({this.props.serverAddress})</p>
        </div>
      </div>
    );
  }
};
