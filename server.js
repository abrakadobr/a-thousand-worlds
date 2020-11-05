const express = require('express')
const webpack = require('webpack')

const wpCfg = require('./webpack.config')

//log.test('packing dashboard frontend')
//console.log(wpCfg)
webpack(wpCfg,(err,st)=>{
  if (err||st.hasErrors())
  {
    console.log(err,[st.compilation.errors])
    console.error('website compilation failed',err)
  } else {
    console.log('website compiled')
  }
})

let app = express()

app.use(express.static('./build2'))

app.get('*',(req,res)=>{
  res.sendFile('./build2/index.html',{root:'.'})
})

app.listen(4004,()=>{
  console.log('listen on 4004')
})
