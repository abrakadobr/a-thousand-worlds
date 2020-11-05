export const Ui = {
  template: `<div id="app-ui">
    <div v-if="hasDialog" id="ui-modal-back"></div>

    <div v-if="showConfirm" class="modal" :class="clsConfirm" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">{{$store.state.ui.confirm.title}}</h5>
            <button @click="doConfirm(false)" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <p>{{$store.state.ui.confirm.message}}</p>
          </div>

          <div class="modal-footer">
            <button @click="doConfirm(false)" type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('Cancel')}}</button>
            <button @click="doConfirm(true)" type="button" class="btn btn-primary">{{$t('Ok')}}</button>
          </div>

        </div>
      </div>
    </div>

    <div v-if="showPrompt" class="modal" :class="clsPrompt" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">{{$store.state.ui.prompt.title}}</h5>
            <button @click="doPrompt(false)" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <p>{{$store.state.ui.prompt.message}}</p>
            <input type="text" class="form-control" v-model="promptVal">
          </div>

          <div class="modal-footer">
            <button @click="doPrompt(false)" type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('Cancel')}}</button>
            <button @click="doPrompt(true)" type="button" class="btn btn-primary">{{$t('Ok')}}</button>
          </div>

        </div>
      </div>
    </div>

    <div v-if="showFormPrompt" class="modal" :class="clsFormPrompt" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">{{$store.state.ui.formPrompt.title}}</h5>
            <button @click="doFormPrompt(false)" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <p>{{$store.state.ui.formPrompt.message}}</p>
            <tjs-form
              :fields="$store.state.ui.formPrompt.fields"
              :btnOk="''"
              :btnCancel="''"
              :routeCancel="'/'"
              :noButtons="true"
              @submit="doFormPrompt(true)"
              v-model="formVal"
            ></tjs-form>
          </div>

          <div class="modal-footer">
            <button @click="doFormPrompt(false)" type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('Cancel')}}</button>
            <button @click="doFormPrompt(true)" type="button" class="btn btn-primary">{{$t('Ok')}}</button>
          </div>

        </div>
      </div>
    </div>






  </div>`,
  data() {
    return {
      promptVal: '',
      formVal: {}
    }
  },
  methods: {
    doConfirm(res)
    {
      this.$store.dispatch('ui/dlgConfirmDone',res)
    },
    doPrompt(res)
    {
      if (res)
        this.$store.dispatch('ui/dlgPromptDone',this.promptVal)
      else
        this.$store.dispatch('ui/dlgPromptDone',null)
      this.promptVal = ''
    },
    doFormPrompt(res)
    {
      if (res)
        this.$store.dispatch('ui/dlgFormPromptDone',this.formVal)
      else
        this.$store.dispatch('ui/dlgFormPromptDone',null)
      this.formVal = {}
    }
  },
  computed: {
    hasDialog() {
      return this.$store.state.ui.confirm.ack
            || this.$store.state.ui.prompt.ack
            || this.$store.state.ui.formPrompt.ack
    },
    showConfirm() {
      return this.$store.state.ui.confirm.ack !== null
    },
    showPrompt() {
      return this.$store.state.ui.prompt.ack !== null
    },
    showFormPrompt() {
      return this.$store.state.ui.formPrompt.ack !== null
    },
    clsConfirm() {
      return this.$store.state.ui.confirm.ack !== null?'show d-block':''
    },
    clsPrompt() {
      return this.$store.state.ui.prompt.ack !== null?'show d-block':''
    },
    clsFormPrompt() {
      return this.$store.state.ui.formPrompt.ack !== null?'show d-block':''
    }
  }
}
  
