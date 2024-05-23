import { deriveCodepointsFromFilenames, generateIconInfoList, generatePackageJson, removeHexNumber } from './font-generator.utils';
import { IconInfo } from '../common/types/icon-info.type';

import * as webfontsGenerator from 'webfonts-generator';
import * as globby from 'globby';
import * as fs from 'fs';

const svgFiles = globby.sync(['**/*.svg'], { cwd: 'icons', absolute: true });
const codepoints = deriveCodepointsFromFilenames(svgFiles);

new Promise((resolve, reject) => {
    webfontsGenerator({
        files: svgFiles,
        rename: removeHexNumber,
        dest: 'dist/generated-font/dist/fonts',
        cssDest: 'dist/generated-font/dist/iam-logos.css',
        cssFontsUrl: './fonts',
        cssTemplate: 'src/font-generator/font-generator.css.template',
        fontName: 'iam-logos',
        types: ['svg', 'ttf', 'woff', 'woff2', 'eot'],
        templateOptions: {
            classPrefix: 'iam-logo-',
            baseSelector: '.iam-logo'
        },
        fontHeight: 1000,
        normalize: true,
        round: 10e4,
        writeFiles: true,
        html: true,
        codepoints
    }, (error) => {
        if (error) {
            reject(error);
        } else {
            resolve(true);
        }
    });
}).then(() => {
    const iconInfo = require('../../icons/icon-info.json');
    const manifest: IconInfo[] = generateIconInfoList(codepoints, iconInfo);
    fs.writeFileSync('dist/generated-font/dist/iam-logos.json', JSON.stringify(manifest, null, 4));
    fs.writeFileSync('dist/generated-font/package.json', JSON.stringify(generatePackageJson(), null, 4));
    fs.copyFileSync('README.md', 'dist/generated-font/README.md');

    console.log('iam-logos font and styles have been successfully built and copied to target/dist/iam-logos');
}).catch((error) => {
    console.log('Fail!', error);
});
