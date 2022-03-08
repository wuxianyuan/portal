import './App.css';

function App(props) {
  let Dom=()=>{return <>123</>}
  let path=window.location?.pathname
  switch (path) {
    case '/test1':
      // require('../node_modules/zhangshaowei_pro2/build/static/js/main.58b3e3f5') 
      // require('../node_modules/zhangshaowei_pro2/build/static/css/main.ce9b7b67.css')
      // import('../node_modules/zhangshaowei_pro2/build/static/js/main.58b3e3f5')
      // import('../node_modules/zhangshaowei_pro2/build/static/css/main.ce9b7b67.css')
      break;
    case '/test2':
      // import ('../node_modules/zhangshaowei_pro1/build/static/js/main.4ebbeb85')
      // import ('../node_modules/zhangshaowei_pro1/build/static/css/main.073c9b0a.css')
      // require('../node_modules/zhangshaowei_pro1/build/static/js/main.4ebbeb85') 
      // require('../node_modules/zhangshaowei_pro1/build/static/css/main.073c9b0a.css')
      break;
    default:

      break;
  }
  return <Dom></Dom>
}

export default App;
