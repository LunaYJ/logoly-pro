import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Logo from '../../components/Logo'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'Logoly.Pro'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='logoly-pro index'>
        <Logo />
        <View className='logoly-pro-brief'>一个简约的在线 Logo 生成工具</View>
      </View>
    )
  }
}
