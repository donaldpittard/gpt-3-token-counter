# llm-token-counter README

LLM Token Counter is a simple VS Code extension to help you count the number of tokens in a selected piece of text.
This is helpful for ensuring that you don't go over your token count when writing software that sends chat
messages to GPT-3 models.

## Features
This extension adds an item to the status bar menu that will tell you how many GPT-3 tokens are in the currently selected text.

![Display GPT-3 Tokens in Status Bar](/images/gpt-3-tokens-screen-shot.png?raw=true "Status bar displaying GPT-3 Token Count")

In order to run the extension, open the command pallet, and select `LLM: Count GPT-3 tokens in selected text`

## Known Issues

1. This extension works only for GPT-3 models, and not other models that may create different tokens for different strings
2. Larger text takes a longer time to computer
   
