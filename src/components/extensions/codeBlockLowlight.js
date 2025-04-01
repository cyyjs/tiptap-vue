/*
 * @Author: cyy
 * @Date: 2025-03-31 18:25:15
 * @LastEditors: cyy
 * @LastEditTime: 2025-03-31 18:25:15
 * @Description: 
 */
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
// import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'
const lowlight = createLowlight({
  html,
  js,
  css,
})
// lowlight.register('css', css)
// lowlight.register('js', js)
// lowlight.register('ts', ts)
// lowlight.register('html', html)
lowlight.register('vue', html)
lowlight.registerAlias('javascript', 'js')
console.log(lowlight.listLanguages());
export default CodeBlockLowlight.configure({
  defaultLanguage: 'plaintext',
  lowlight,
})