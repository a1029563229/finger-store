import Toast from './components/toast';
import Alert from './components/alert';

const version = '0.0.1';
const install = function(Vue, config = {}) {
  if (install.installed) return;
  Vue.use(Toast);
  Vue.use(Alert);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  install,
  version,
  Toast,
  Alert
};
