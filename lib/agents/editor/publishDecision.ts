export function publishDecision(score: number) {
  return {
    publish: score >= 60,
    featured: score >= 85,
    breaking: score >= 95,
    priority: Math.max(1, Math.ceil(score / 10)),
    importance: score,
  };
}