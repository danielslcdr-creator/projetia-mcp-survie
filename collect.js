const fs = require('fs');

const lignes = fs.readFileSync('wcvp_names.csv', 'utf-8').split('\n');
const header = lignes[0].split('|');
const idxNom = header.indexOf('taxon_name');
const idxStatut = header.indexOf('taxon_status');
const idxFamille = header.indexOf('family');
const idxLifeform = header.indexOf('lifeform_description');
const idxClimat = header.indexOf('climate_description');
const idxGeo = header.indexOf('geographic_area');

const especes = [];
for (let i = 1; i < lignes.length; i++) {
  const cols = lignes[i].split('|');
  if (cols[idxStatut] === 'Accepted' && cols[idxNom] && cols[idxGeo] && cols[idxGeo].includes('Switzerland')) {
    especes.push({
      nom: cols[idxNom],
      famille: cols[idxFamille],
      lifeform: cols[idxLifeform],
      climat: cols[idxClimat]
    });
  }
}

fs.writeFileSync('plantes.json', JSON.stringify(especes, null, 2), 'utf-8');
console.log("Extrait:", especes.length, "espèces");