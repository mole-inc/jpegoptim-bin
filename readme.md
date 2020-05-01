# jpegoptim-bin ![Node CI](https://github.com/mole-inc/jpegoptim-bin/workflows/Node%20CI/badge.svg)

> [jpegoptim](https://github.com/tjko/jpegoptim) is a utility for optimizing JPEG files that provides lossless optimization (based on optimizing the Huffman tables) and "lossy" optimization based on setting a maximum quality factor

You probably want [`imagemin-jpegoptim`](https://github.com/mole-inc/imagemin-jpegoptim) instead.

[![Downloads](https://badgen.net/npm/dm/@mole-inc/jpegoptim-bin)](https://www.npmjs.com/package/@mole-inc/jpegoptim-bin)
[![Version](https://badgen.net/npm/v/@mole-inc/jpegoptim-bin)](https://www.npmjs.com/package/@mole-inc/jpegoptim-bin)
[![codecov](https://codecov.io/gh/mole-inc/jpegoptim-bin/branch/master/graph/badge.svg)](https://codecov.io/gh/mole-inc/jpegoptim-bin)

## Install

```
$ npm install @mole-inc/jpegoptim-bin
```

Make sure you have the correct version of libjpeg. See [jpegoptim's README](https://github.com/tjko/jpegoptim#readme) for more information.


## Usage

```js
const {execFile} = require('child_process');
const jpegoptim = require('@mole-inc/jpegoptim-bin');

const args = [
	'--overwrite',
	'--strip-all',
	'--strip-iptc',
	'--strip-icc',
	'--all-progressive',
	'--dest=build',
	'input.jpg'
];

execFile(jpegoptim, args, err => {
	console.log('Image minified');
});
```


## CLI

```
$ npm install --global @mole-inc/jpegoptim-bin
```

```
$ jpegoptim --help
```


## License

This is a fork of [imagemin/jpegoptim-bin](https://github.com/imagemin/jpegoptim-bin) licensed under the MIT License.

see license file and vendor/jpegoptim-license.txt file.
