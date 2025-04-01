<template>
  <div>{{ content }}</div>
  <div>
    <button @click="editor.commands.insertDrawIo()">add drawio</button>
  </div>
  <div v-if="editor">
    <DragHandle :editor="editor">
      <div class="custom-drag-handle" />
    </DragHandle>
  </div>
  <div class="main">
    <div class="sidebar">
      <div class="sidebar-options">
        <div class="label-large">目录</div>
        <div class="table-of-contents">
          <template v-if="editor">
            <ToC :editor="editor" :items="items" />
          </template>
        </div>
      </div>
    </div>
    <editor-content class="editor" :editor="editor" />
  </div>
</template>

<script setup>
import { watch, onUnmounted, ref } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "./extensions/codeBlockLowlight";
import { DragHandle } from "@tiptap-pro/extension-drag-handle-vue-3";
import NodeRange from "@tiptap-pro/extension-node-range";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import Placeholder from "@tiptap/extension-placeholder";
import {
  getHierarchicalIndexes,
  TableOfContents,
} from "@tiptap-pro/extension-table-of-contents";
import ToC from "./extensions/toc/Toc.vue";
import "katex/dist/katex.min.css";
import drawIoExtension from "@rcode-link/tiptap-drawio";

const content = defineModel({ type: String });
const items = ref([]);
const editor = useEditor({
  content: content.value,
  extensions: [
    StarterKit,
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      onUpdate: (content) => {
        items.value = content;
      },
    }),
    Placeholder.configure({
      placeholder: "请输入内容",
    }),
    CodeBlockLowlight,
    NodeRange.configure({
      // allow to select only on depth 0
      // depth: 0,
      key: null,
    }),
    Mathematics, // 数学公式
    drawIoExtension.configure({
      openDialog: "dblclick",
    }),
  ],
  autofocus: "end",
  editable: true,
  injectCSS: true,
  onUpdate: (e) => {
    console.log(e);
    content.value = editor.value.getHTML();
  },
});
watch(content, (val) => {
  const isSame = editor.value.getHTML() === val;
  if (isSame) {
    return;
  }
  editor.value.commands.setContent(val, false);
});
onUnmounted(() => {
  editor.value.destroy();
});
</script>

<style lang="less">
.main {
  display: flex;
  flex-direction: row;

  @media (max-width: 540px) {
    flex-direction: column-reverse;
  }
  .editor {
    width: 100%;
  }
}
::selection {
  background-color: #70cff850;
}

.ProseMirror {
  padding: 1rem 1rem 1rem 0;

  * {
    margin-top: 0.75em;
  }

  .ProseMirror-widget * {
    margin-top: auto;
  }

  ul,
  ol {
    padding: 0 1rem;
  }
}

.ProseMirror-noderangeselection {
  *::selection {
    background: transparent;
  }

  * {
    caret-color: transparent;
  }
}

.ProseMirror-selectednode,
.ProseMirror-selectednoderange {
  position: relative;

  &::before {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    content: "";
    top: -0.25rem;
    left: -0.25rem;
    right: -0.25rem;
    bottom: -0.25rem;
    background-color: #70cff850;
    border-radius: 0.2rem;
  }
}

.custom-drag-handle {
  &::after {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1.25rem;
    content: "⠿";
    font-weight: 700;
    cursor: grab;
    background: #0d0d0d10;
    color: #0d0d0d50;
    border-radius: 0.25rem;
  }
}
.tiptap p.is-empty::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap {
  min-height: 100px;
  border: 1px solid #ccc;
  padding: 10px;
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }
  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  .Tiptap-mathematics-editor {
    background: #202020;
    color: #fff;
    font-family: monospace;
    padding: 0.2rem 0.5rem;
  }

  .Tiptap-mathematics-render {
    padding: 0 0.25rem;

    &--editable {
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #eee;
      }
    }
  }

  .Tiptap-mathematics-editor,
  .Tiptap-mathematics-render {
    border-radius: 0.25rem;
    display: inline-block;
  }
}
.sidebar {
  border-right: 1px solid var(--gray-3);
  flex-grow: 0;
  flex-shrink: 0;
  padding: 1rem;
  width: 15rem;
  position: sticky;
  // height: 100vh;
  top: 0;

  @media (min-width: 800px) {
    width: 20rem;
  }

  @media (max-width: 540px) {
    border-bottom: 1px solid var(--gray-3);
    border-left: unset;
    width: 100%;
    height: auto;
    position: unset;
    padding: 1.5rem;
  }
}

.sidebar-options {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  position: sticky;
  top: 1rem;
}

.table-of-contents {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  gap: 0.25rem;
  overflow: auto;
  text-decoration: none;

  > div {
    border-radius: 0.25rem;
    padding-left: calc(0.875rem * (var(--level) - 1));
    transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);

    &:hover {
      background-color: var(--gray-2);
    }
  }

  .empty-state {
    color: var(--gray-5);
    user-select: none;
  }

  .is-active a {
    color: var(--purple);
  }

  .is-scrolled-over a {
    color: var(--gray-5);
  }

  a {
    color: var(--black);
    display: flex;
    gap: 0.25rem;
    text-decoration: none;

    &::before {
      content: attr(data-item-index) ".";
    }
  }
}
</style>
