const API_BASE = '/api' // Le proxy Nginx redirige /api vers le backend

export const saveDraft = async (payload) => {
  const res = await fetch(`${API_BASE}/production/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Échec sauvegarde brouillon')
  return res.json()
}

export const submitSheet = async (payload) => {
  const res = await fetch(`${API_BASE}/production/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Échec validation fiche')
  return res.json()
}
