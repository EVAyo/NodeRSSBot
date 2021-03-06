const fs = require('fs/promises');
const path = require('path');
const globby = require('globby');
const { nodeFileTrace } = require('@vercel/nft');
const files = [
    'dist/source/index.js',
    'node_modules/cross-env/src/bin/cross-env.js',
    'node_modules/cross-env/src/index.js'
];
const exclude = [/cross-env/, /\.wasm$/];

(async () => {
    const { fileList } = await nodeFileTrace(files, {
        base: path.resolve(path.join(__dirname, '..'))
    });
    const deps = await globby('node_modules');
    const toDel = deps.filter(
        (f) => exclude.every((re) => !re.test(f)) && !fileList.includes(f)
    );
    await Promise.all(toDel.map((f) => fs.unlink(f)));
})();
