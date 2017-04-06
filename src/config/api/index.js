/*
 * Created by YangYusheng on 2017-04-05
 */

import slides from '../../mock/home-swipe'

export default {
	getSlides() {
		return setPromise(slides);
	}
}

const setPromise = data => {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
}