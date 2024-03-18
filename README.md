# 支持原格式粘贴的 Markdown 编辑器

基于 [bytemd](https://github.com/bytedance/bytemd) 封装，在 bytemd 编辑器中将复制的 HTML 格式内容粘贴时转换为 Markdown 格式。

本想直接使用 bytemd 的，但浏览器直接引入 bytemd（`<script src="https://unpkg.com/bytemd"></script>`）居然报错：`Uncaught ReferenceError: process is not defined`，一看源码居然把 `process.env.NODE_ENV` 直接打进浏览器引入的包里了，于是就自己封装一个，添加原格式粘贴的功能，并打包成一个浏览器可直接引入的 UMD 包和 ESM 包。

## browser

- UMD

```html
<script src="https://unpkg.com/bytemd-paste"></script>
```

Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BytemdPaste</title>
  <link rel="stylesheet" href="https://unpkg.com/bytemd/dist/index.css" />
  <link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css" />
  <link rel="stylesheet" href="https://unpkg.com/highlight.js/styles/github.min.css" />
</head>
<body>
  <script src="https://unpkg.com/@bytemd/plugin-gfm"></script>
  <script src="https://unpkg.com/@bytemd/plugin-highlight"></script>
  <script src="https://unpkg.com/bytemd-paste"></script>
  <script>
    const editor = BytemdPaste({
      target: document.body, // DOM to render
      props: { // bytemd options
        value: '# BytemdPaste',
        plugins: [bytemdPluginGfm(), bytemdPluginHighlight()]
      }
    })
    editor.$on('change', e => {
      editor.$set({ value: e.detail.value })
    })
  </script>
</body>
```

locale example see `dist/example.html`

- ESM

```js
import BytemdPaste from 'https://unpkg.com/bytemd-paste'
```

Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BytemdPaste</title>
  <link rel="stylesheet" href="https://unpkg.com/bytemd/dist/index.css" />
  <link rel="stylesheet" href="https://unpkg.com/github-markdown-css/github-markdown.css" />
</head>
<body>
  <script type="module">
    import BytemdPaste from 'https://unpkg.com/bytemd-paste'

    const editor = BytemdPaste({
      target: document.body, // DOM to render
      props: { // bytemd options
        value: '# BytemdPaste'
      }
    })
    editor.$on('change', e => {
      editor.$set({ value: e.detail.value })
    })
  </script>
</body>
```

## import

```
npm i bytemd-paste
```

```js
import BytemdPaste from 'bytemd-paste'
import bytemdPluginGfm from '@bytemd/plugin-gfm'
import bytemdPluginHighlight from '@bytemd/plugin-highlight'

const editor = BytemdPaste({
  target: document.body, // DOM to render
  props: { // bytemd options
    value: '# BytemdPaste',
    plugins: [bytemdPluginGfm(), bytemdPluginHighlight()]
  }
})
editor.$on('change', e => {
  editor.$set({ value: e.detail.value })
})
```
