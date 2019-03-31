import Taro, { Component } from '@tarojs/taro'
import { Canvas, View, Label, Input, Switch, Icon } from '@tarojs/components'

import './index.less'

export default class Logo extends Component {
  state = {
    prefixText: 'Logoly',
    suffixText: 'Pro',
    prefixColor: '#fff',
    suffixColor: '#000',
    highlightColor: '#f90',
    transparentBg: true,
    fontSize: '32',
    reverseHigtlight: false,
  }

  componentDidMount() {
    this.drawAndOrExportCanvas()
  }

  drawAndOrExportCanvas = (exportCanvas = false) => {
    let {
      prefixText,
      suffixText,
      prefixColor,
      suffixColor,
      highlightColor,
      transparentBg,
      fontSize,
      reverseHigtlight,
    } = this.state

    // 颜色重置
    const colorRegExp = /^#[\da-f]{3}$|^#[\da-f]{6}$/
    if (!colorRegExp.test(prefixColor)) {
      prefixColor = '#fff'
    }
    if (!colorRegExp.test(suffixColor)) {
      suffixColor = '#000'
    }
    if (!colorRegExp.test(highlightColor)) {
      highlightColor = '#f90'
    }

    const ctx = Taro.createCanvasContext('logoly-pro-canvas', this.$scope)

    // 背景 默认 画布 300 * 150
    if (!transparentBg) {
      ctx.setFillStyle('#000')
      ctx.fillRect(0, 0, 300, 150)
    }

    ctx.setLineJoin('round')
    ctx.setFontSize(fontSize)
    ctx.setTextBaseline('middle')

    // 前置文字、后置文字宽度
    const prefixTextWidth = ctx.measureText(prefixText).width
    const suffixTextWidth = ctx.measureText(suffixText).width

    // 导出图片的宽高
    // 两边 padding 各 10，文字间隔 10，文字单边 padding 5
    // 上下 padding 各 8，文字背景上下 padding 各 4
    const exportCanvasWidth = prefixTextWidth + suffixTextWidth + 35
    const exportCanvasHeight = +fontSize + 24

    // 导出图片的起始位置
    const x = 150 - prefixTextWidth - 5 - 10
    const y = 75 - exportCanvasHeight / 2

    // 高亮文字背景的宽高
    const hightlighWidth = suffixTextWidth + 10
    const hightlighHeight = +fontSize + 8

    // 高亮文字背景的起始位置
    const hx = 150
    const hy = 75 - hightlighHeight / 2

    // 前置文字
    ctx.setFillStyle(prefixColor)
    ctx.setTextAlign('right')
    ctx.fillText(prefixText, 145, 75)

    ctx.setFillStyle(highlightColor)
    ctx.fillRect(hx, hy, hightlighWidth, hightlighHeight)

    // 后置文字
    ctx.setFillStyle(suffixColor)
    ctx.setTextAlign('left')
    ctx.fillText(suffixText, 155, 75)

    if (!exportCanvas) {
      return ctx.draw()
    }

    return ctx.draw(false, () => this.exportLogo(x, y, exportCanvasWidth, exportCanvasHeight))
  }

  exportLogo = (x, y, width, height) => {
    Taro.canvasToTempFilePath(
      {
        canvasId: 'logoly-pro-canvas',
        x,
        y,
        width,
        height,
        success(res) {
          Taro.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
        },
        fail(err) {
          console.log('canvasToTempFilePath err', err)
        },
      },
      this.$scope
    )
  }

  onChange = (e, field) => {
    let value = e.target.value

    // 颜色值需要加上 '#' 号
    if (field.indexOf('Color') !== -1) {
      value = '#' + value;
    }

    this.setState({ [field]: value }, this.drawAndOrExportCanvas)
  }

  showTIps = () => Taro.showModal({
    title: 'Tips',
    content: '颜色值为 3 位或 6 位 16 进制值，如输入不符合要求则取默认值',
    showCancel: false
  })

  render() {
    const {
      prefixText,
      suffixText,
      prefixColor,
      suffixColor,
      highlightColor,
      transparentBg,
      fontSize,
      reverseHigtlight,
    } = this.state

    return (
      <View className="generator-porhub">
        <Canvas className="logoly-pro-canvas" canvasId="logoly-pro-canvas" />

        <View className="customize-field">
          <Label className="field-item">
            前置文字
            <Input
              value={prefixText}
              onInput={e => this.onChange(e, 'prefixText')}
              maxLength="10"
              placeholder="Logoly"
            />
          </Label>

          <Label className="field-item">
            后置文字
            <Input
              value={suffixText}
              onInput={e => this.onChange(e, 'suffixText')}
              maxLength="10"
              placeholder="Pro"
            />
          </Label>

          <Label className="field-item">
            前置颜色
            <Input
              value={prefixColor.replace('#', '')}
              onInput={e => this.onChange(e, 'prefixColor')}
              maxLength="6"
              placeholder="fff"
            />
            <Icon type="info" onClick={this.showTIps} />
          </Label>

          <Label className="field-item">
            后置颜色
            <Input
              value={suffixColor.replace('#', '')}
              onInput={e => this.onChange(e, 'suffixColor')}
              maxLength="6"
              placeholder="000"
            />
          </Label>

          <Label className="field-item">
            高亮颜色
            <Input
              value={highlightColor.replace('#', '')}
              onInput={e => this.onChange(e, 'highlightColor')}
              maxLength="6"
              placeholder="f90"
            />
          </Label>

          <Label className="field-item field-item--switch">
            透明背景
            <Switch
              className="switch"
              checked={transparentBg}
              onChange={e => this.onChange(e, 'transparentBg')}
            />
          </Label>
        </View>

        <Button
          className="logoly-pro-export"
          type="primary"
          plain
          onClick={() => this.drawAndOrExportCanvas(true)}
        >
          保存 Logo
        </Button>
      </View>
    )
  }
}
