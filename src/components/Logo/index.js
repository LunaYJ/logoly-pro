import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Logo extends Component {
  render () {
    return (
      <View className='logoly-pro-logo'>
        <Text className="prefix">Logoly</Text>
        <Text className="suffix">Pro</Text>
      </View>
    )
  }
}

