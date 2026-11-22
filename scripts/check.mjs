// Checks what the OpenAI portal rejects on upload and what `claude plugin validate` does not cover.
// Usage: node scripts/check.mjs [vX.Y.Z]   (a tag argument must match the manifest versions)
import {readFileSync, existsSync} from 'node:fs';
import assert from 'node:assert/strict';

const json = path => JSON.parse(readFileSync(path, 'utf8'));
const openai = json('plugin.json'), claude = json('.claude-plugin/plugin.json');
const mcp = json('mcp.json'), claudeMcp = json('.mcp.json');

assert.equal(openai.version, claude.version, 'plugin.json and .claude-plugin/plugin.json versions differ');
const tag = process.argv[2];
if (tag) assert.equal(tag, 'v' + openai.version, `tag ${tag} does not match version ${openai.version}`);

// Without $schema the OpenAI portal treats the upload as skills-only, and MCP cannot be added to that listing later.
assert.equal(mcp.$schema, 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', 'mcp.json needs its $schema');
assert.equal(mcp.mcpServers.notiker.url, claudeMcp.mcpServers.notiker.url, 'mcp.json and .mcp.json point at different servers');

const ext = openai.extensions['com.openai'];
for (const file of [ext.onboardingSkill, ext.interface.logo, ext.interface.composerIcon])
  assert.ok(existsSync(file), `missing ${file}`);
assert.match(ext.onboardingSkill, /SKILL\.md$/, 'onboardingSkill must name a SKILL.md');

const tools = new Set(['tree', 'find', 'get', 'create', 'update', 'comment', 'save_html']); // server/src MCP tools
const {positive, negative} = ext.review.test_cases;
assert.ok(positive.length >= 5 && negative.length >= 3, 'OpenAI review needs 5 positive and 3 negative test cases');
for (const c of positive) {
  assert.ok(c.prompt && c.expected_behavior, `incomplete test case: ${c.description}`);
  for (const t of c.tools_triggered.split(/,\s*/)) assert.ok(tools.has(t), `unknown tool ${t} in "${c.description}"`);
}
console.log(`ok: notiker ${openai.version}`);
