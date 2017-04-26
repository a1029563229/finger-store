import VpAlert from './alert.vue';
import vp from '../../../assets/js/selector';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

let alert = {};
alert.install = function (Vue, options) {
    let opt = {
        defaultType:'bottom'
    };
    for (let property in options) {
        opt[property] = options[property];
    }

    Vue.prototype.$alert = function () {};

    Vue.prototype.$alert = Vue.prototype.$alert.show = (title = '', content = '', type) => {
        if (document.getElementsByClassName('vp-mb').length) {
            return;
        }
        let toastTpl = Vue.extend(VpAlert);
        let tpl = new toastTpl(({
            propsData: { title, content, type }
        })).$mount().$el;
        document.body.appendChild(tpl);
    };

    Vue.prototype.$alert.close = (cb = '') => {
        let vpMb = vp('.vp-mb');
        let vpAlert = vp('.vp-alert');
        let close$ = Observable.interval(250).take(2)
            .startWith(false)
            .subscribe(boo => {
                if (boo) {
                document.body.removeChild(vpMb.getNode());
                close$.unsubscribe();
                } else {
                    vpMb.removeClass('fadeIn').addClass('fadeOut');
                    vpAlert.removeClass('zoomIn').addClass('zoomOut');
                }
            });

    }
};

export default alert;
