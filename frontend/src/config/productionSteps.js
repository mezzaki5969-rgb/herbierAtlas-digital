/**
 * Configuration centralisée de toutes les fiches de production.
 * Le frontend s'adapte automatiquement à cette structure.
 */

export const PRODUCTION_CONFIG = {
  MENTHE_BQ: {
    label: 'Menthe BQ',
    steps: [
      { id: 'pre', label: 'Prénéttoyage', machines: ['Ligne Pré-nettoyage'], input: 'ENTREE_MP', outputs: ['SEMI_TRIE'] },
      { id: 'semi', label: 'Produit Semi-Fini', machines: ['Ligne Semi-Fini'], input: 'ENTREE', outputs: ['BRS', 'BQ'] },
      { id: 'final', label: 'Étape Finale', machines: ['Ligne Finale'], input: 'ENTREE', outputs: ['PRODUIT_FINI_BQ'] }
    ]
  },
  MANUEL: {
    label: 'Production Manuelle',
    steps: [
      { id: 'triage', label: 'Étape Triage', machines: ['Poste Triage'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'final', label: 'Étape Finale', machines: ['Poste Finale'], input: 'ENTREE', outputs: ['ECART', 'REBUS', 'PRODUIT_FINI'] }
    ]
  },
  EXTERIEUR: {
    label: 'Production Extérieure',
    steps: [
      { id: 'mpn1', label: 'MPN 1', machines: ['MPN 1'], input: 'ENTREE_MP', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'mpn2', label: 'MPN 2', machines: ['MPN 2'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'broyage', label: 'Broyage Rebus', machines: ['Broyeur'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ETAPE_SUIVANTE'] }
    ]
  },
  MENTHE_POULIOT: {
    label: 'Menthe Pouliot (PLT)',
    steps: [
      { id: 'm1', label: 'Machine 1 (ZG)', machines: ['M1 (ZG)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'm3', label: 'Machine 3', machines: ['M3'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'm2', label: 'Machine 2 (ASP)', machines: ['M2 (ASP)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 't1', label: 'Tamis 1', machines: ['Tamis 1'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'final', label: 'Tamis Détecteur', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['ENTIER', 'TIGE', 'ECART', 'REBUS'] }
    ]
  },
  THYM: {
    label: 'Thym',
    steps: [
      { id: 'et1_2', label: '1ère + 2ème Étape', machines: ['M3 (ZZ+ASP+TAMIS)', 'M1 (ZZ)', 'M2 (ASP)'], input: 'ENTREE_MP', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'ecarts', label: 'Triage des Écarts', machines: ['Tamis 1', 'Tamis 4', 'NV Tamis'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'final', label: 'Étape Finale', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['PRODUIT_FINI', 'ECART', 'REBUS'] }
    ]
  },
  ROMARIN_KUTAS: {
    label: 'Romarin QLT Kutas',
    steps: [
      { id: 'zg', label: 'M (ZG)', machines: ['M (ZG)'], input: 'ENTREE_MP', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 't1', label: 'Tamis 1', machines: ['Tamis 1'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 'm1', label: 'Machine 1', machines: ['M1'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 't2', label: 'Tamis 2', machines: ['Tamis 2'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 'm2', label: 'Machine 2', machines: ['M2'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 'broyeur', label: 'Broyeur', machines: ['Broyeur'], input: 'ENTREE', outputs: ['SEMI_TRIE_BROYE'] },
      { id: 'final', label: 'Tamis Détecteur', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['ENTIER', 'CP', 'FIN', 'PRODUIT_A_RETRIE'] }
    ]
  },
  VERVEINE_BRS: {
    label: 'Verveine Brisures (BRS)',
    steps: [
      { id: 'step1', label: 'Machine 3 / Machine 1', machines: ['M3 (ZG+TAMIS)', 'M1'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'step2', label: 'Tamis Détecteur', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['ECART', 'REBUS', 'PRODUIT_FINI'] }
    ]
  },
  VERVEINE_STD: {
    label: 'Verveine STD',
    steps: [
      { id: 'pre', label: 'Machine (ZG+TAMIS)', machines: ['M (ZG+TAMIS)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS', 'BRISURES'] },
      { id: 'final', label: 'Tamis Détecteur', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['ECART', 'REBUS', 'BRISURES', 'STD', 'BRS'] }
    ]
  },
  VERVEINE_FEL_TRADCO: {
    label: 'Verveine Fel Tradco (Sachet)',
    steps: [
      { id: 'pre', label: 'Pré-nettoyage', machines: ['Ligne Pré-nettoyage'], input: 'ENTREE_MP', outputs: ['SEMI_TRIE'] },
      { id: 'fini_vrac', label: 'Produit Fini (Vrac)', machines: ['Ligne Vrac'], input: 'ENTREE', outputs: ['BRS', 'FEUILLE'] },
      { id: 'emballage', label: 'Étiquetage & Cachetage', machines: ['Étiqueteuse', 'Cacheteuse'], input: 'ENTREE', outputs: ['NBR_SACHET_ETIQ', 'NBR_SACHET_CACHETE'], isCount: true },
      { id: 'melange', label: 'Mélange', machines: ['Mélangeur'], input: 'ENTREE', outputs: ['SEMI_TRIE'] },
      { id: 'sachet_final', label: 'Conditionnement Sachet', machines: ['Ligne Sachet'], input: 'ENTREE', outputs: ['SACHET', 'KG', 'BRS'] }
    ]
  },
  ROMARIN_AT_1_2: {
    label: 'Romarin AT 1 & 2',
    steps: [
      { id: 'm3', label: 'Machine 3', machines: ['M3'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'm1', label: 'Machine 1 (ZG)', machines: ['M1 (ZG)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'm2', label: 'Machine 2 (ASP)', machines: ['M2 (ASP)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 't1', label: 'Tamis 1', machines: ['Tamis 1'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'final', label: 'Tamis Détecteur', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['ENTIER', 'COUPE', 'FIN', 'ECART', 'REBUS'] }
    ]
  },
  ROMARIN_EXTRACTION: {
    label: 'Romarin Extraction',
    steps: [
      { id: 'm1', label: 'Machine 1', machines: ['M1'], input: 'ENTREE_MP', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 'm2', label: 'Machine 2', machines: ['M2'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 'm3', label: 'Machine 3 (ZG+Tamis)', machines: ['M3 (ZG+TAMIS)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'PRODUIT_A_RETRIE'] },
      { id: 'tamis', label: 'Tamis', machines: ['Tamis'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS', 'QLT'] },
      { id: 'melangeur', label: 'Mélangeur', machines: ['Mélangeur'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'QLT'] },
      { id: 'detecteur', label: 'Tamis Détecteur', machines: ['Tamis Détecteur'], input: 'ENTREE', outputs: ['PRODUIT_A_RETRIE', 'PRODUIT_FINI'] }
    ]
  },
  PRODUIT_ZG: {
    label: 'Produit ZG',
    steps: [
      { id: 'm1', label: 'Machine 1 (ZG)', machines: ['M1 (ZG)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'm2', label: 'Machine 2 (ZG)', machines: ['M2 (ZG)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'm3', label: 'Machine 3 (ZG)', machines: ['M3 (ZG)'], input: 'ENTREE', outputs: ['SEMI_TRIE', 'ECART', 'REBUS'] },
      { id: 'final', label: 'Produit Fini', machines: ['Sortie'], input: 'ENTREE', outputs: ['PRODUIT_FINI'] }
    ]
  }
}

/** Mapping technique → Affichage Français */
export const COLUMN_LABELS = {
  ENTREE_MP: 'Entrée MP', SEMI_TRIE: 'Semi-Trié', ECART: 'Écart', REBUS: 'Rebus',
  ENTREE: 'Entrée', PRODUIT_FINI: 'Produit Fini', PRODUIT_FINI_BQ: 'Produit Fini BQ',
  PRODUIT_A_RETRIE: 'À Retrier', BRS: 'Brisures', BQ: 'BQ', PDR: 'Poudre', STD: 'Standard',
  TIGE: 'Tige', ENTIER: 'Entier', CP: 'CP', FIN: 'Fin', BRISURES: 'Brisures',
  FEUILLE: 'Feuille', NBR_SACHET_ETIQ: 'Nb. Sachets Étiquetés', NBR_SACHET_CACHETE: 'Nb. Sachets Cachetés',
  SACHET: 'Sachet', KG: 'Kg', QLT: 'Qualité', ETAPE_SUIVANTE: 'Vers Étape Suiv.',
  SEMI_TRIE_BROYE: 'Semi-Trié Broyé'
}
