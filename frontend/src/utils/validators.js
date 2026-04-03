export function validateSheet(sheet, config) {
  const errors = []
  if (!sheet.lotInterne) errors.push('Le N° Lot Interne est obligatoire')
  if (!sheet.responsable) errors.push('Le Responsable est obligatoire')
  if (!sheet.date) errors.push('La date est obligatoire')

  config?.steps.forEach(step => {
    step.machines.forEach(m => {
      const input = Number(sheet.data[m]?.[step.input] || 0)
      if (input <= 0 && !step.isCount) {
        errors.push(`L'entrée (${step.input}) pour ${m} doit être > 0`)
      }
      if (!step.isCount) {
        const reste = input - step.outputs.reduce((s, c) => s + (Number(sheet.data[m]?.[c]) || 0), 0)
        if (reste < -0.5) errors.push(`Écart masse trop important sur ${m} (Reste: ${reste.toFixed(2)}). Vérifiez les pesées.`)
      }
    })
  })
  return errors
}
