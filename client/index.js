import React from 'react';
import { AppRegistry } from 'react-native';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory/lib';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';

import configureStore from './app/store';
import {
  App, Authorization, Basket, Catalogue, Main, Profile, 
  Registration, ClothingView, Favourite
} from './app/features';
import { ClothingsRow } from './app/components';

console.disableYellowBox = true;

const store = configureStore();
const RouterWithRedux = connect()(Router);

const Client = () => {
  const httpLink = new HttpLink({ uri: 'http://10.0.3.2:3000/graphql' });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="app" hideNavBar component={App} initial />
            <Scene key="main" hideNavBar component={Main} />
            <Scene key="authorization" hideNavBar component={Authorization} />
            <Scene key="registration" hideNavBar component={Registration} />
            <Scene key="catalogue" hideNavBar component={Catalogue} />
            <Scene key="profile" hideNavBar component={Profile} />
            <Scene key="favourite" hideNavBar component={Favourite} />
            <Scene key="clothingView" hideNavBar component={ClothingView} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    </ApolloProvider>);
};

AppRegistry.registerComponent('client', () => Client);
