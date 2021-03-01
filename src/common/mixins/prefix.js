const preName = 'hls'

export default {
  methods: {
    // 生成 css class
    b (className) {
      return className ? `${preName}-${className}` : ''
    },
  },
}
