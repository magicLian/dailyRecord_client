/**
 * debug
 */
import utils from "./utils";

const debug = {
	isDebug: utils.isDebug,
	print: function (message) {
		if (this.isDebug) {
			console.log(message);
		}
	}
};
export default debug;