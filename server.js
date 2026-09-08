const fs = require('fs');
const path = require('path');
const express = require('express');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
const { z } = require('zod');

const PLANTES = JSON.parse(fs.readFileSync(path.join(__dirname, 'plantes.json'), 'utf-8'));

const server = new McpServer({ name: "Survie-Suisse", version: "1.0.0" });

server.tool("get_plante", "Renvoie les infos d'une plante de Suisse par son nom scientifique", {
  nom: z.string()
}, async ({ nom }) => {
  const p = PLANTES.find(x => x.nom.toLowerCase().includes(nom.toLowerCase()));
  return { content: [{ type: "text", text: p ? JSON.stringify(p) : "Plante non trouvée" }] };
});

server.tool("list_plantes", "Liste toutes les plantes de Suisse disponibles dans la base", {}, async () => {
  return { content: [{ type: "text", text: PLANTES.map(p => p.nom).join(", ") }] };
});

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

module.exports = app;