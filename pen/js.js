if (!isSecureContext)
        console.warn('This page is not running in a secute context. Serve it via HTTPS.');

console.log('foo');

if ('paintWorklet' in CSS) {
	let root = document.documentElement;

	CSS.paintWorklet.addModule('https://gist.githubusercontent.com/mgiulio/93b9d103eab91846bd060a2dfbd90a61/raw/ed5e8f46c186d40064e80adf91f4cee91b84a216/paint.js');

	if ('registerProperty' in CSS) {
		CSS.registerProperty({
			name: '--num-rays',
			syntax: '<integer>',
			inherits: false,
			initialValue: 4,
		});
		CSS.registerProperty({
			name: '--start-alpha',
			syntax: '<number>',
			inherits: false,
			initialValue: 0.2,
		});
		CSS.registerProperty({
			name: '--end-alpha',
			syntax: '<number>',
			inherits: false,
			initialValue: 0.2,
		});
	}
}