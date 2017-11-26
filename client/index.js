import React from 'react';
import { AppRegistry } from 'react-native';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';

import configureStore from './app/store/configureStore';
import App from './app/components/App/App';
import Authorization from './app/components/Authorization/Authorization';
import Main from './app/components/Main/Main';

const store = configureStore();
const RouterWithRedux = connect()(Router);

const Client = () => {
  const httpLink = new HttpLink({ uri: 'http://10.0.3.2:3000/graphql' });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="main" hideNavBar component={Main} title="Main" />
            <Scene key="app" hideNavBar component={App} title="App" initial />
            <Scene key="authorization" hideNavBar component={Authorization} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    </ApolloProvider>);
};

AppRegistry.registerComponent('client', () => Client);
