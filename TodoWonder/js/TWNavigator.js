// Navigation
import React, { Component } from 'react';
import ReactNative from 'react-native'

const {
  View,
  Text,
  StatusBar,
  NavigationExperimental: Navigation,
} = ReactNative

import LoginScreen from './LoginScreen'

const {
  CardStack: NavCardStack,
  StateUtils: NavStateUtils,
} = Navigation

const reduceNavState = (navState, action) => {
  const {type, key} = action;
  switch (type) {
    case 'push':
      const route = {key}
      return NavStateUtils.push(navState, route)
    case 'pop':
      return NavStateUtils.pop(navState)
    default:
      return navState
  }
}

class TWNavigator extends Component {
  constructor(props, context) {
    super(props, context)
    this._renderScene = this._renderScene.bind(this)
    this._goBack = this._navigate.bind(this, 'pop')
  }
  render() {
    return (
      <NavCardStack
        renderScene={this._renderScene}
        navigationState={this.props.navigationState}
        onNavigate={this._goBack}
        />
    )
  }
  _renderScene(sceneProps) {
    const routeKey = sceneProps.scene.route.key
    switch (routeKey) {
      case 'login_screen':
        return <LoginScreen {...sceneProps} />
      default:
        return <Text>Unknown route: {routeKey}</Text>
    }
  }
  _navigate(action) {
    const newNavState = reduceNavState(this.state.navigation, action)
    if (newNavState !== this.state.navigation) {
      this.setState({
        navigation: newNavState,
      })
    }
  }
}

module.exports = TWNavigator