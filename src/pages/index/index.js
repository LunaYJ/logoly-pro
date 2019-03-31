import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import Logo from '../../components/Logo'
import './index.less'

export default class Index extends Component {
  config = {
    navigationBarTitleText: 'Logoly.Pro',
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goToCustomize = () => Taro.navigateTo({ url: '/pages/generator/index' })

  render() {
    return (
      <View className="logoly-pro index">
        <Logo />
        <View className="logoly-pro-brief">一个简约的在线 Logo 生成工具</View>

        <Button className="go-to-customize" onClick={this.goToCustomize} type="primary" plain>
          马上定制 Logo
        </Button>

        <View className="logoly-pro-footer">
          <View className="footer-item">
            <Text className="desc">Inspiration by Bestony</Text>
            <Image
              style="width: 16px; height: 16px; border-radius: 8px; vertical-align: middle;"
              src="https://avatars3.githubusercontent.com/u/13283837?s=32&v=4"
            />
          </View>
          <View className="footer-item">
            <Text className="desc">Code by GHLandy</Text>
            <Image
              style="width: 16px; height: 16px; border-radius: 8px; vertical-align: middle;"
              src="https://avatars3.githubusercontent.com/u/14830914?s=32&v=4"
            />
          </View>
          <View className="footer-item">
            <Text className="desc desc-link">Repo at https://github.com/GHLandy/logoly-pro.git</Text>
          </View>
        </View>
      </View>
    )
  }
}
