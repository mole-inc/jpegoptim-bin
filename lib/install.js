'use strict';
const fs = require('fs');
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const which = require('which');
const binVersionCheck = require('bin-version-check');
const {promisify} = require('util');

const bin = require('.');

const install = async () => {
	try {
		await bin.run();
		log.success('jpegoptim pre-build test passed successfully');
	} catch (error) {
		log.warn(error.message);
		log.warn('jpegoptim pre-build test failed');
		log.info('compiling from source');

		try {
			await binBuild.url('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.6.tar.gz', [
				`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
				'make install'
			]);
			log.success('jpegoptim built successfully');
		} catch (error) {
			log.error(error.stack);
			throw error;
		}
	}
};

(async () => {
	try {
		const use = process.platform === 'win32' ? 'jpegoptim.exe' : 'jpegoptim';
		const systemBin = await which(use).catch(error => {
			throw error;
		});
		const version = '>=1.4.6';
		await binVersionCheck(systemBin, version).catch(error => {
			log.warn(`The \`${systemBin}\` binary doesn't seem to work correctly or doesn't satisfy version \`${version}\``);
			throw error;
		});
		const vendor = path.join(__dirname, '../vendor');
		await promisify(fs.mkdir)(vendor).catch(error => {
			if (error.code === 'EEXIST') {
				return;
			}

			log.warn(error.message);
			throw error;
		});
		const target = path.join(vendor, use);
		await promisify(fs.symlink)(systemBin, target).catch(error => {
			if (error.code === 'EEXIST') {
				return;
			}

			log.warn(error.message);
			throw error;
		});
		log.success(`create jpegoptim symlink \`${target}\``);
	} catch (_) {
		await install().catch(() => {
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		});
	}
})();
