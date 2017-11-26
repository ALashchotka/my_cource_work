import React from 'react'
import { AsyncStorage, AppRegistry } from 'react-native'
import App from './app/components/App/App'
import Authorization from './app/components/Authorization/Authorization';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { setContext } from 'apollo-link-context';
import configureStore from './app/store/configureStore';
const store = configureStore();
const RouterWithRedux = connect()(Router);

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo'
import Toolbar from "./app/components/Toolbar/Toolbar";
import Main from "./app/components/Main/Main";

import { getStorageValue } from './app/utils/storage'
import { TOKEN } from "./app/constants/session";

const Client = () => {
  let token;
  getStorageValue(TOKEN)
    .then((val) => {
      token = val;
    });
  const httpLink = new HttpLink({uri: 'http://10.0.3.2:3000/graphql' });
  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : null,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="main" hideNavBar={true} component={Main} title="Main"/>
            <Scene key="app" hideNavBar={true} component={App} title="App"  initial = {true}/>
            <Scene key="authorization" hideNavBar={true} component={Authorization}  />
          </Scene>
        </RouterWithRedux>
      </Provider>
    </ApolloProvider>)
};

AppRegistry.registerComponent('client', () => Client);
