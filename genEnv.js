const fs = require('fs');
const { parse, stringify } = require('envfile');

const exitError = () => {
  process.exit(1);
};

const init = () => {
	// default to prod
	let envFile = '.env.production';
	if (process.env.NODE_ENV === 'production' && process.env.VARIANT === 'dev-live') {
		envFile = '.env.dev-live';
	} else if (process.env.NODE_ENV === 'development') {
		envFile = '.env.development';
	}

	//read env file
	console.log(`Looking for file ${envFile}`);
	new Promise ((resolve, reject) => {
		fs.readFile(envFile, (err, data) => {
			if (err) {
				console.log(`Cannot able to find file ${envFile}`);
				reject(err);
			} else if (!data || data === '') {
				reject('Invalid Env data');
			} else {
				resolve(parse(data));
			}
		
		});	
	}).then((data) => {
		let jsData = `export default ${JSON.stringify(data)};`;
		return new Promise((resolve, reject) => {
			fs.writeFile('env.js', jsData, (err) => {
				if (err) {
					console.log('Failed to create env.js file');
					reject(err);
				} else {
					console.log('env.js file created successfully');
					resolve();
				}
			});
		});
	}).catch((error) => {
		console.log(error);
		exitError();
	});
};


init();