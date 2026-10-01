const PROJECT_RETURN_INTENT_KEY = 'portfolio:return-to-projects';

export function markProjectReturnIntent() {
  try {
    window.sessionStorage.setItem(PROJECT_RETURN_INTENT_KEY, 'true');
  } catch {
    // A navegação continua funcionando mesmo quando o storage está indisponível.
  }
}

export function prepareProjectReturnTransition() {
  markProjectReturnIntent();
  document.documentElement.dataset.homeScrollTarget = 'projects';
}

export function hasProjectReturnIntent() {
  try {
    return window.sessionStorage.getItem(PROJECT_RETURN_INTENT_KEY) === 'true';
  } catch {
    return false;
  }
}

export function clearProjectReturnIntent() {
  try {
    window.sessionStorage.removeItem(PROJECT_RETURN_INTENT_KEY);
  } catch {
    // Nada a limpar quando o storage está indisponível.
  }
}

export function isCurrentDocumentReload() {
  const [navigation] = performance.getEntriesByType(
    'navigation'
  ) as PerformanceNavigationTiming[];

  if (navigation?.type !== 'reload') return false;

  try {
    const loadedUrl = new URL(navigation.name);
    return loadedUrl.pathname === window.location.pathname;
  } catch {
    return true;
  }
}
