import { ref, reactive, computed } from 'vue'
import { PRODUCTION_CONFIG } from '@/config/productionSteps'
import { validateSheet } from '@/utils/validators'
import { saveDraft, submitSheet } from '@/api/production'

export function useProductionSheet() {
  const selectedProduct = ref('')
  const config = computed(() => PRODUCTION_CONFIG[selectedProduct.value] || null)

  const sheet = reactive({
    date: new Date().toISOString().split('T')[0],
    lotInterne: '',
    responsable: '',
    equipe: 'A',
    produit: '',
    data: {},
    mdo: {},
    observations: '',
    status: 'DRAFT'
  })

  const rowTotals = reactive({})
  const rowReste = reactive({})
  const errors = ref([])

  // Initialisation d'une nouvelle fiche
  const initSheet = () => {
    sheet.produit = selectedProduct.value
    sheet.data = {}
    sheet.mdo = {}
    Object.keys(rowTotals).forEach(k => delete rowTotals[k])
    Object.keys(rowReste).forEach(k => delete rowReste[k])
    errors.value = []

    config.value?.steps.forEach(step => {
      step.machines.forEach(m => {
        sheet.data[m] = {}
        ;[step.input, ...step.outputs].forEach(col => sheet.data[m][col] = null)
        rowTotals[m] = 0
        rowReste[m] = 0
      })
      sheet.mdo[step.id] = 0
    })
  }

  // Calcul automatique : Entrée - (Sorties) = Reste
  const calcRow = (machine, step) => {
    const d = sheet.data[machine] || {}
    if (step.isCount) return // Pas de calcul de masse pour les sachets

    const input = Number(d[step.input] || 0)
    const outputs = step.outputs.reduce((sum, col) => sum + (Number(d[col]) || 0), 0)

    rowTotals[machine] = outputs
    rowReste[machine] = input - outputs
  }

  // Vérification avant envoi
  const checkValidation = () => {
    errors.value = validateSheet(sheet, config.value)
    return errors.value.length === 0
  }

  const handleSaveDraft = async () => {
    try {
      await saveDraft({ ...sheet, updatedAt: new Date() })
      alert('💾 Brouillon sauvegardé')
    } catch (e) {
      alert('❌ Erreur de sauvegarde')
    }
  }

  const handleSubmit = async () => {
    if (!checkValidation()) {
      alert(`⚠️ ${errors.value.length} erreur(s) à corriger (ex: bilan masse incorrect, champs vides).`)
      return
    }
    try {
      await submitSheet({ ...sheet, status: 'VALIDATED', validatedAt: new Date() })
      alert('✅ Fiche validée et transmise au système de traçabilité.')
      initSheet() // Reset
    } catch (e) {
      alert('❌ Erreur lors de la validation')
    }
  }

  return {
    selectedProduct, config, sheet, rowTotals, rowReste, errors,
    initSheet, calcRow, handleSaveDraft, handleSubmit
  }
}
