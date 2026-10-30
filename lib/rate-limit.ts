// Limiteur de débit simple en mémoire (fenêtre glissante par clé, ex. adresse IP).
// Limite : l'état est local à chaque instance serverless (Vercel) et se réinitialise à froid.
// C'est une protection de base ; pour un blocage strict, passer à Upstash Redis / Vercel KV.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Nettoyage occasionnel pour éviter une croissance infinie de la Map.
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    });
  }
  return true;
}
