import main from './main'
// const {render} = () => import('./main.js')
if (window.loadSpaModuleCallBack) {
  window.loadSpaModuleCallBack(main)
}