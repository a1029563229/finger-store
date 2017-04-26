/*
 * Created by YangYusheng on 2017-04-03
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs';

export default {
	props: {
		scroller: {
			type: [HTMLDocument, Element, Window],
			default() {
				return window
			}
		}
	},
	data () {
		return {
			scroll$:false
		}
	},
	mounted() {
		this.$bindScoll();
	},
	methods: {
		$bindScoll() {
			if (!this.scroller) { 
				return 
			}
			this._handleScroll = (e) => {
				// 滑动屏幕回调函数
				if (this.onScroll) this.onScroll();
			};
			this.scroller.addEventListener('scroll', this._handleScroll);
			// this.scroll$ = Observable.fromEvent(document,'scroll')
			// 	.debounceTime(100)
			// 	.map(e => anchor.getBoundingClientRect().bottom < 0)
			// 	.subscribe(e => {
			// 		console.log(e);
			// 		this._handleScroll(e);
			// 	})
		},
		$unbindScoll(scroller) {
			scroller = scroller || this.scroller;
			if (this._handleScroll) this.scroll$.unsubscribe();
		}
	},
	beforeDestory() {
		this.$unbindScoll();
	},
	watch: {
		scroller(scroller, oldScroller) {
			if (scroller === oldScroller) return
			this.$unbindScoll(oldScroller);
			this.$bindScoll(scroller);
		}
	}
}