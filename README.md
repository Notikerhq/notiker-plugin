# Notiker for Claude, ChatGPT and Codex

Use your [Notiker](https://notiker.com) notes from AI apps: search and read notes, create and update them, leave comments, and keep artifacts, dashboards and reports as HTML pages that open running.

This plugin contains one skill (`skills/notiker`) and the address of Notiker's remote MCP server. It runs no code on your computer.

## Connect

- **Claude Code:** `/plugin marketplace add Notikerhq/notiker-plugin`, then `/plugin install notiker@notiker`.
- **Claude, ChatGPT and Codex apps:** install Notiker from the app's plugin or connector directory once it is listed.

The first use opens Notiker's connection page. Sign in, choose one workspace, and choose whether the app may create and change notes. Access lasts 90 days and can be revoked any time in Notiker under Settings → API tokens.

## Writing notes

Ask the plugin to put a hotel address, checklist or table in a collapsible section. It writes the section into the Markdown note. Readers can expand it when needed. [Markdown example](https://notiker.com/developers#collapsible-sections)

## What is sent where

The app sends your requests and the note text it writes to `https://api.notiker.com/mcp`, operated by Notiker, and receives the notes it reads. Sign-in uses OAuth; your password never reaches the app, and Notiker stores only a hash of the access token. What the app keeps of the notes it reads is governed by that app's own policy. See the [privacy policy](https://notiker.com/privacy) and [terms](https://notiker.com/terms).

## Support

[notiker.com/support](https://notiker.com/support) · [API documentation](https://notiker.com/developers)

## Releasing

Every pull request runs `node scripts/check.mjs` and `claude plugin validate .`. To release, bump `version` in `plugin.json` and `.claude-plugin/plugin.json`, merge, and push a tag `vX.Y.Z`. The tag publishes a GitHub release with the plugin ZIP. The Claude directory rescans `main` on its own. For ChatGPT and Codex, upload the release ZIP as a new version in the OpenAI Platform portal.

## License

MIT
