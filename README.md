# Micro Focus ias-icons

This project is the icon font for SVG logos of Application connectors for Opentext Identity and Access products. The logos within the font represent SAML and OAuth Application connector templates available within Opentext products using the application's official logo in SVG format.

### Helpful Links

- [Documentation Site](https://microfocus.github.io/iam-logos)

### Usage

Install the package using npm:

```
$ npm install @microfocus/iam-logos
```

If you are building a project with Angular, you can add the following to your angular.json file:

```
"styles": [
    "node_modules/@microfocus/ias-icons/dist/iam-logos/iam-logos.css",
    "src/styles.scss"
],
```

If you want to manually integrate iam-logos, download this tar file that includes all the files you'll need:

```
https://registry.npmjs.org/@microfocus/iam-logos/-/iam-logos-1.1.0.tgz

(Note: ...iam-logos-1.1.2 number at the end of this url should match the latest release number)

1. Enter above url to latest release into your browser address field. This will download the distribution files.
2. Unpack the tgz file which will show a package folder containing all files.
3. Open "Dist" folder. It includes a Font folder and iam-logos.css file.
4. Copy all the files inside the Font folder to the Font folder in your project.
5. Copy the iam-logos.css file to the same place it exists in your project. This should overwrite the existing iam-logos.css file.
6. Edit the iam-logos.css file to make sure the font urls point to where your Font folders exists. 
```

The icons can be referenced by class name, as shown in the following example:

```
<i class="iam-logos iam-logos-servicenow"></i>
```
All svg files are a represnetation of the copyright holders logos.

iam-logos code - Copyright 2024 Opentext. All rights reserved.

