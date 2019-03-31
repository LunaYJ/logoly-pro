import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'

import Pornhub from '../../components/Pornhub'
import './index.less'

export default class Generator extends Component {
  config = {
    navigationBarTitleText: 'Logoly.Pro generator',
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="logoly-pro generator">
        <Pornhub />
      </View>
    )
  }
}
