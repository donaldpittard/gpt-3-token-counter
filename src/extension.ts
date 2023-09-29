/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/


import * as vscode from 'vscode';
import { encode } from 'gpt-3-encoder';

const commandId = 'llm-token-counter.countTokens';
let statusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar
	// item is selected
	subscriptions.push(vscode.commands.registerCommand(commandId, () => {
		// const n = countSelectionTextTokens(vscode.window.activeTextEditor);
		// vscode.window.showInformationMessage(`GPT-3 Tokens selected: ${n}`);
	}));

	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;
	subscriptions.push(statusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

/**
 * Given a vscode.TextEditor instance, this function attempts to return
 * the numnber of tokens in the editor's text selection.
 * 
 * @param editor 
 * @returns 
 */
function countSelectionTextTokens(editor: vscode.TextEditor | undefined): number {
	const selectionText = getSelectionText(editor);
	const tokenCount = countTokens(selectionText);

	return tokenCount;
}

/**
 * Given a vscode.TextEditor instance, this function attempts to return
 * the selected text as a string.
 * 
 * @todo Check on string limits - there could be a scenario where a string won't
 * 		 be enough to hold the selection.
 * 
 * @param editor 
 * @returns 
 */
function getSelectionText(editor: vscode.TextEditor | undefined): string {
	if (!editor) {
		return "";
	}

	const lastSelection = editor.selections.length - 1;
	const selectionStart = editor.selection.start;
	const selectionEnd = editor.selections[lastSelection].end;
	const selectionRange = new vscode.Range(selectionStart, selectionEnd);
	const text = editor.document.getText(selectionRange);

	return text;
}

/**
 * Given a string of text, this function tokenizes the text and then returns
 * the number of tokens.
 * 
 * @param text 
 * @returns
 */
function countTokens(text: string): number {
	return encode(text).length;
}

function updateStatusBarItem(): void {
	const tokenCount = countSelectionTextTokens(vscode.window.activeTextEditor);

	if (tokenCount > 0) {
		statusBarItem.text = `GPT-3 Tokens: ${tokenCount}`;
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}