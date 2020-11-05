export const Field = {
  props:['finfo','value'],
  watch: {
    value(next)
    {
      this.val = this.value
    },
    val(next)
    {
      this.$emit('input',this.val)
    }
  },
  methods: {
    confOp(opi,def)
    {
      if(this.finfo.config&&this.finfo.config.ops&&this.finfo.config.ops[opi])
      {
        let op = this.finfo.config.ops[opi]
        if (op.source==='manual')
          return op.manual
        return `${op.source}`
      }
      return def
    }
  },
  data() {
    return {
      val: this.value
    }
  }
}
