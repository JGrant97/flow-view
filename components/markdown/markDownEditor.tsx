'use client'
import '@mdxeditor/editor/style.css'
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertTable,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
  InsertCodeBlock,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  SandpackConfig,
  ListsToggle,
  BlockTypeSelect,
  StrikeThroughSupSubToggles,
  InsertImage,
  imagePlugin
} from '@mdxeditor/editor'
import styled from 'styled-components'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
  ]
}

const StyledEditor = styled(MDXEditor)`
  background-color: #fff;
  max-width: 100%;
  min-width: 0;
`

export default function MarkDownEditor({
  editorRef,
  ...props
}: { editorRef?: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <StyledEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS',  } }),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve('https://picsum.photos/200/300')
          },
          imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              {' | '}
              <StrikeThroughSupSubToggles/>
              {' | '}
              <ListsToggle/>
              {' | '}
              <BlockTypeSelect/>
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertCodeBlock />
            </>
          )
        })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}