/**
 * 基础 mixins
 */

import { case2Param } from '../utils'

const preName = 'hls'

export default {
  methods: {
    /**
     * 生成 css class helper
     * c()               // 'hls-componentName'
     * c('wrap')         // 'hls-componentName-wrap'
     * c('wrap--active') // 'hls-componentName-wrap--active'
     * @param {String} className 类名
     * @returns String
     */
    c (className) {
      const { name } = this.$options // 组件名

      return className ? `${preName}-${case2Param(name)}-${className}` : `${preName}-${case2Param(name)}`
    },
  },
}
