import * as assert from 'assert';
import * as myExtension from '../../extension';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	/**
	 * This test is based off of sample text found here: https://platform.openai.com/tokenizer.
	 * As of 09/29/23, the token count was 64. Note also that in a production environment
	 * the difference between LF and CRLF can make a big difference in the number of tokens.
	 */
	test("It should show the correct amount of tokens for the open ai sample text", async () => {
		const openAiSampleText = `Many words map to one token, but some don't: indivisible.

Unicode characters like emojis may be split into many tokens containing the underlying bytes: 🤚🏾

Sequences of characters commonly found next to each other may be grouped together: 1234567890`;

		const document = await vscode.workspace.openTextDocument({ content: openAiSampleText });

		await vscode.window.showTextDocument(document, { preserveFocus: true });
		await vscode.commands.executeCommand('editor.action.selectAll');
		await vscode.commands.executeCommand(myExtension.commandId);

		assert.equal(myExtension.statusBarItem.text, "GPT-3 Tokens: 64");
	});
});
