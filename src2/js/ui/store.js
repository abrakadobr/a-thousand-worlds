export const Store = {
  namespaced: true,
  state: ()=>{
    return {
      busy: false,
      pageTitle: '',
      popups: [],
      confirm: {
        title: '',
        message: '',
        ack: null
      },
      prompt: {
        title: '',
        message: '',
        ack: null
      },
      formPrompt: {
        title: '',
        message: '',
        fields: [],
        ack: null
      }
    }
  },
  mutations: {
    setBusy(state,next)
    {
      state.busy = next
    },
    setPageTitle(state,next)
    {
      state.pageTitle = next
    },
    pushPopup(state,popup)
    {
      state.popups.push(popup)
    },
    shiftPopup(state)
    {
      state.popups.shift()
    },
    setDlgConfirm(state,dlg)
    {
      state.confirm = dlg
    },
    setDlgPrompt(state,dlg)
    {
      state.prompt = dlg
    },
    setDlgFormPrompt(state,dlg)
    {
      state.formPrompt = dlg
    }
  },
  actions: {
    popup(ctx,pp)
    {
      ctx.commit('pushPopup',pp)
      setTimeout(()=>{
        ctx.commit('shiftPopup')
      },5000)
    },
    dlgConfirm(ctx,dlg)
    {
      return new Promise((acc,rej)=>{
        ctx.commit('setDlgConfirm',{...dlg,ack:acc})
      })
    },
    dlgConfirmDone(ctx,res)
    {
      let ack = ctx.state.confirm.ack
      ctx.commit('setDlgConfirm',{
        title: '', message: '', ack: null
      })
      ack(res)
    },
    dlgPrompt(ctx,dlg)
    {
      return new Promise((acc,rej)=>{
        ctx.commit('setDlgPrompt',{...dlg,ack:acc})
      })
    },
    dlgPromptDone(ctx,res)
    {
      let ack = ctx.state.prompt.ack
      ctx.commit('setDlgPrompt',{
        title: '', message: '', ack: null
      })
      ack(res)
    },
    dlgFormPrompt(ctx,dlg)
    {
      return new Promise((acc,rej)=>{
        ctx.commit('setDlgFormPrompt',{...dlg,ack:acc})
      })
    },
    dlgFormPromptDone(ctx,res)
    {
      let ack = ctx.state.formPrompt.ack
      ctx.commit('setDlgFormPrompt',{
        title: '', message: '', fields: [], ack: null
      })
      ack(res)
    }
  }
}
