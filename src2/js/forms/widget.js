import NumberField from './field.number'
import StringField from './field.string'
import PasswordField from './field.password'
import DatetimeField from './field.datetime'
import BooleanField from './field.boolean'
import RelationField from './field.relation'


export const TJSWidget = {
  props: ['finfo','value'],
  data() {
    return {
      edited: false,
      val: this.value,
      vals: this.value
    }
  },
  /**
  created()
  {
    //console.log('widget created',this.value,this.finfo)
    console.log('kefir?',Kefir)
  },
  /**/
  watch: {
    value() {
      //console.log('widget value',this.value)
      this.val = this.value
      this.vals = this.value
      //this.$emit('input',this.value)
    },
    val() {
      //console.log('widget val',this.val)
      this.$emit('input',this.val)
    },
    vals() {
      //console.log('widget val',this.val)
      this.$emit('input',this.vals)
    }
  },
  computed: {
    isMultiple() {
      if (typeof this.finfo.quantity !== 'number')
        return false
      return this.finfo.quantity !== 1
    }
  },
  methods: {
    addMultipleValue()
    {
      if (!Array.isArray(this.vals))
        this.vals=[undefined]
      else
        this.vals.push(undefined)
    },
    delMultiple(atI)
    {
      this.vals=this.vals.filter((x,xi)=>xi!==atI)
    }
  },
  template: `<div>
    <label>
      {{finfo.name}}
      <button type="button" v-if="isMultiple" class="ml-2 btn btn-light btn-sm">
        <i class="fas fa-plus" @click.prevent="addMultipleValue()"></i>
      </button>
    </label>
    <component
      v-if="!isMultiple"
      :is="'tjs-form-field-'+finfo.type"
      :finfo="finfo"
      v-model="val"
    ></component>
    <div v-if="isMultiple">
      <div class="row mb-1" v-for="(sval,vi) in vals" :key="vi">
        <div class="col-1">
          <button type="button" class="btn btn-light btn-sm">
            <i class="fas fa-minus" @click.prevent="delMultiple(vi)"></i>
          </button>
        </div>
        <div class="col-11">
          <component
            :is="'tjs-form-field-'+finfo.type"
            :finfo="finfo"
            v-model="vals[vi]"
          ></component>
        </div>
      </div>
    </div>
    <div class="mb-2"><small class="text-muted">{{finfo.description}}</small></div>
  </div>`
}
