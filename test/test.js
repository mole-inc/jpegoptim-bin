'use strict';
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const compareSize = require('compare-size');
const jpegoptim = require('..');

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegoptim, ['--version']));
});

test('minify a JPG', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(temporary, 'test.jpg');
	const args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + temporary,
		src
	];

	await execa(jpegoptim, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
