import Transfer from './Transfer/Transfer';

const components = {
  Transfer
}

export default {
  install(app){
    // 全域註冊插件
    for (const comp in components) {
     app.component(comp, components[comp]);
    }
  }
}