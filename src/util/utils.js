/**
 * 工具类
 */

const utils = {
	clone : function(obj) {
		let o;
		if (typeof obj === "object") {
			if (obj === null) {
				o = null;
			} else {
				if (obj instanceof Array) {
					o = [];
					for (let i = 0, len = obj.length; i < len; i++) {
						o.push(this.clone(obj[i]));
					}
				} else {
					o = {};
					for (let j in obj) {
						o[j] = this.clone(obj[j]);
					}
				}
			}
		} else {
			o = obj;
		}
		return o;
	},
	isDebug: true
};

export default utils