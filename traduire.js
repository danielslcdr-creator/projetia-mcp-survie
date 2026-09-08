const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();
const especes = JSON.parse(fs.readFileSync('plantes.json', 'utf-8'));

async function main() {
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{
      role: "user",
      content: `Voici une liste de plantes en JSON. Traduis UNIQUEMENT les champs "lifeform" et "climat" de l'anglais vers le français, sans rien changer d'autre, sans ajouter de nouveau champ. Réponds uniquement avec le JSON complet traduit:\n\n${JSON.stringify(especes)}`
    }]
  });
  fs.writeFileSync('plantes_fr.json', msg.content[0].text, 'utf-8');
  console.log("Traduit avec succès");
}

main();
//je n'ai pas executer ce script car je n'avais pas reussi a avoir des credit et c'est un peu tard pour demander une cle api.. 