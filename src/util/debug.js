/**
 * debug
 */
const debug = {
	isDebug: true,
	print: function (message) {
		if (this.isDebug) {
			console.log(message);
		}
	}
};
export default debug;