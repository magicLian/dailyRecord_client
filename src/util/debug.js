/**
 * debug
 */
import config from "./config";

const debug = {
	isDebug: config.isDebug,
	print: function (message) {
		if (this.isDebug) {
			console.log(message);
		}
	}
};
export default debug;