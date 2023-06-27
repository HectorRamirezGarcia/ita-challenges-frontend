import {Component} from '@angular/core';
import {EditorState, Compartment} from "@codemirror/state"
import {keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
import {basicSetup, EditorView} from "codemirror"
import {esLint, javascript} from "@codemirror/lang-javascript"
import {java} from "@codemirror/lang-java"
import {htmlLanguage, html} from "@codemirror/lang-html"
import {language} from "@codemirror/language"
import {linter, Diagnostic} from "@codemirror/lint"
import {syntaxTree} from "@codemirror/language"

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent {

}

const languageConf = new Compartment

const autoLanguage = EditorState.transactionExtender.of(tr => {
  /* if (!tr.docChanged) return null
  let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100))
  let stateIsHTML = tr.startState.facet(language) == htmlLanguage
  if (docIsHTML == stateIsHTML) return null
  return {
    effects: languageConf.reconfigure(docIsHTML ? html() : javascript())
  } */
return {  effects: languageConf.reconfigure(java() ) }
})


let startState = EditorState.create({
  doc: "Hello World",
  extensions: [keymap.of(defaultKeymap)]
})


let theme = EditorView.theme({
  "&": {
    color: "#1E1E1E",
    backgroundColor: "#FFF",
    height: "300px",
    borderRadius: "0 0 8px 8px",
    border: "1px solid #1E1E1E"
  },
  ".cm-content": {
    caretColor: "#BF2086",
    minHeight: "200px"
  },
  "&.cm-focused": {
    border: "1px solid #BF2086",
    outline: 'none'
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#BF2086"
  },
  ".cm-gutters": {
    backgroundColor: "#BF2086",
    color: "#FFF",
    border: "none",
    minHeight: "200px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#1E1E1E",
  },
  ".cm-activeLine": {
    backgroundColor: "#BF208625",
  },
  ".cm-scroller": {
    overflow: "auto",
    borderRadius: "0 0 7px 7px",
  },
})

const regexpLinter = linter(view => {
  let diagnostics: Diagnostic[] = []
  syntaxTree(view.state).cursor().iterate(node => {
    if (node.name == "⚠"){
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "error",
        message: 'Error!',
        actions: []
      })
    }
  })
  return diagnostics
})

let editor = new EditorView({

  extensions: [
    basicSetup,
    languageConf.of(autoLanguage),
    autoLanguage,
    regexpLinter,
    theme,
  ],
  parent: document.body,
  
})

