<template>
  <div class="production-sheet">
    <header class="sheet-header">
      <h2>📋 Fiche de Production Numérique</h2>
      <div class="header-grid">
        <div class="field"><label>Date</label><input type="date" v-model="sheet.date" /></div>
        <div class="field"><label>N° Lot Interne</label><input v-model="sheet.lotInterne" placeholder="LOT-YYYY-XXXX" /></div>
        <div class="field"><label>Responsable</label><input v-model="sheet.responsable" /></div>
        <div class="field"><label>Équipe</label>
          <select v-model="sheet.equipe"><option>A</option><option>B</option><option>C</option><option>D</option></select>
        </div>
        <div class="field full-width"><label>Produit / Recette</label>
          <select v-model="selectedProduct" @change="initSheet">
            <option value="">-- Sélectionner un produit --</option>
            <option v-for="(cfg, key) in PRODUCTION_CONFIG" :key="key" :value="key">{{ cfg.label }}</option>
          </select>
        </div>
      </div>
    </header>

    <main v-if="config">
      <div v-if="errors.length" class="error-banner">
        <h3>⚠️ Champs à corriger</h3>
        <ul><li v-for="(err, i) in errors" :key="i">{{ err }}</li></ul>
      </div>

      <section v-for="step in config.steps" :key="step.id" class="process-step">
        <h3>{{ step.label }}</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Machine / Étape</th>
                <th>{{ COLUMN_LABELS[step.input] }}</th>
                <th v-for="col in step.outputs" :key="col">{{ COLUMN_LABELS[col] || col }}</th>
                <th v-if="!step.isCount">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="machine in step.machines" :key="machine">
                <td class="machine-name">{{ machine }}</td>
                <td><input type="number" step="0.01" v-model.number="sheet.data[machine][step.input]" @input="calcRow(machine, step)" class="input-entry" /></td>
                <td v-for="col in step.outputs" :key="col">
                  <input type="number" step="0.01" v-model.number="sheet.data[machine][col]" @input="calcRow(machine, step)" :class="{ 'input-count': step.isCount }" />
                </td>
                <td v-if="!step.isCount" class="calc-cell">
                  <div>Total: {{ rowTotals[machine] || 0 }}</div>
                  <div :class="{ 'reste-ok': rowReste[machine] >= -0.5, 'reste-warn': rowReste[machine] < -0.5 }">
                    Reste: {{ rowReste[machine] || 0 }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="step-footer">
          <label>MDO (Personnes) : <input type="number" v-model.number="sheet.mdo[step.id]" min="0" /></label>
        </div>
      </section>

      <section class="observations">
        <h3>📝 Observations & Conformité FSSC 22000</h3>
        <textarea v-model="sheet.observations" placeholder="Noter tout écart, incident, arrêt machine ou commentaire qualité..."></textarea>
        <div class="rules">
          <p>⚠️ <strong>ÉCART :</strong> Produit va être retrié dans la même machine</p>
          <p>⚠️ <strong>REBUS :</strong> Produit va être broyé avant passage à l'étape triage rebus</p>
        </div>
      </section>

      <div class="actions">
        <button @click="handleSaveDraft" class="btn secondary">💾 Sauvegarder Brouillon</button>
        <button @click="handleSubmit" class="btn primary">✅ Valider & Transmettre</button>
        <button @click="window.print()" class="btn outline">🖨️ Imprimer / PDF</button>
      </div>
    </main>
    <div v-else class="empty-state">
      <p>👈 Sélectionnez un produit pour charger la fiche de production.</p>
    </div>
  </div>
</template>

<script setup>
import { PRODUCTION_CONFIG, COLUMN_LABELS } from '@/config/productionSteps'
import { useProductionSheet } from '@/composables/useProductionSheet'

const { 
  selectedProduct, config, sheet, rowTotals, rowReste, errors,
  initSheet, calcRow, handleSaveDraft, handleSubmit 
} = useProductionSheet()
</script>

<style scoped>
.production-sheet { max-width: 1200px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
.sheet-header { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e9ecef; }
.header-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 10px; }
.field { display: flex; flex-direction: column; }
.field label { font-size: 0.8rem; font-weight: 600; margin-bottom: 4px; color: #495057; }
.field input, .field select { padding: 8px; border: 1px solid #ced4da; border-radius: 4px; }
.full-width { grid-column: 1 / -1; }

.process-step { margin-bottom: 24px; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden; }
.process-step h3 { background: #e9ecef; margin: 0; padding: 10px 15px; font-size: 1rem; border-bottom: 1px solid #dee2e6; }
.table-wrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { border: 1px solid #dee2e6; padding: 8px; text-align: center; }
th { background: #f8f9fa; font-weight: 600; }
.machine-name { text-align: left; font-weight: 500; background: #fff; }
input[type="number"] { width: 80px; padding: 6px; text-align: right; border: 1px solid #ced4da; border-radius: 4px; }
.input-entry { background: #e7f5ff; border-color: #74c0fc; font-weight: 600; }
.input-count { border-color: #ffd43b; background: #fff9db; }
.calc-cell { font-size: 0.8rem; line-height: 1.4; }
.reste-ok { color: #2b8a3e; font-weight: 600; }
.reste-warn { color: #c92a2a; font-weight: 700; animation: pulse 2s infinite; }
.step-footer { padding: 8px 15px; background: #f8f9fa; border-top: 1px solid #dee2e6; font-size: 0.9rem; }
.observations textarea { width: 100%; height: 90px; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; resize: vertical; }
.rules { background: #fff3cd; color: #856404; padding: 12px; border-radius: 4px; margin-top: 10px; font-size: 0.85rem; border-left: 4px solid #ffc107; }
.actions { display: flex; gap: 12px; margin-top: 24px; justify-content: flex-end; }
.btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
.primary { background: #0d6efd; color: white; }
.secondary { background: #6c757d; color: white; }
.outline { background: transparent; border: 1px solid #0d6efd; color: #0d6efd; }
.error-banner { background: #f8d7da; color: #721c24; padding: 12px; border-radius: 6px; margin-bottom: 15px; }
.empty-state { text-align: center; padding: 60px 20px; color: #6c757d; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
@media print { .actions, .error-banner, .btn { display: none !important; } }
</style>
