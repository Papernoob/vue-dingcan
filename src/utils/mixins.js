export default {
  computed: {
    labelText() {
      return t => {
        let type = ''
        switch (t) {
          case 's':
            type = '小份'
            break
          case 'n':
            type = '正常'
            break
          case 'l':
            type = '大份'
            break
          default:
            break
        }
        return type
      }
    },
  },
}
