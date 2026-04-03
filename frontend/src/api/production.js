const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const saveDraft = async (payload) => {
  console.log('📤 Sauvegarde Brouillon:', payload)
  // Remplacer par fetch réel : return fetch(`${API_BASE}/production/draft`, ...)
  return Promise.resolve()
}

export const submitSheet = async (payload) => {
  console.log('✅ Validation Fiche:', payload)
  // Remplacer par fetch réel : return fetch(`${API_BASE}/production/submit`, ...)
  return Promise.resolve()
}
