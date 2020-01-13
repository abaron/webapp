// Put all packages together.
// Used to generate umd/index.prod.js

import React from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from 'react-intl';

import allMessages from './messages.json';
import TinodeWeb from './views/tinode-web.jsx';
import HashNavigation from './lib/navigation.js';
import LocalStorageUtil from './lib/local-storage.js';
import { LINK_CHAT_LDAP, CHAT_LDAP_CLIENT_ID } from './config.js'
import { detectServerAddress } from './lib/host-name.js'

// Detect human language to use in the UI:
//  Check parameters from URL hash #?hl=ru, then browser, then use 'en' as a fallback.
const { params } = HashNavigation.parseUrlHash(window.location.hash);
const language = (params && params.hl) ||
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en';


// Detect if redirected from ldap token, then set the auth-token to local storage
const localStorageAuthToken = LocalStorageUtil.getObject('auth-token')
const { token: authToken }  = params;
if ( !localStorageAuthToken && !authToken) {
  window.location = `${LINK_CHAT_LDAP}/ldap/chat/authorize?client_id=${CHAT_LDAP_CLIENT_ID}&redirect_uri=${window.location.protocol}//${detectServerAddress()}/ldap/auth/callback&response_type=token`
}

if ( authToken ) {
  const token = JSON.parse(atob(authToken));
  if (token && token.token && token.expires) {
    LocalStorageUtil.setObject('keep-logged-in', true);
    LocalStorageUtil.setObject('auth-token', token);
  }
}

// Get the base language 'en' from a more specific 'en_GB' or 'en-US' as a partial fallback.
const baseLanguage = language.toLowerCase().split(/[-_]/)[0];

// Try the full locale first, then the locale without the region code, fallback to 'en'.
const messages =
  allMessages[language] ||
  allMessages[baseLanguage] ||
  allMessages.en;

ReactDOM.render(
  <IntlProvider locale={language} messages={messages} textComponent={React.Fragment}>
    <TinodeWeb />
  </IntlProvider>,
  document.getElementById('mountPoint')
);
