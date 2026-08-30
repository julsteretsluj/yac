import { annotate } from 'https://esm.sh/rough-notation@0.5.1';

function getHighlighterOptions(element) {
  return {
    type: element.dataset.highlightAction || 'highlight',
    color: element.dataset.highlightColor || 'rgba(212, 20, 122, 0.22)',
    strokeWidth: Number(element.dataset.highlightStroke || 1.5),
    animationDuration: Number(element.dataset.highlightDuration || 600),
    iterations: Number(element.dataset.highlightIterations || 2),
    padding: Number(element.dataset.highlightPadding || 2),
    multiline: element.dataset.highlightMultiline !== 'false',
  };
}

function mountHighlighter(element) {
  const annotation = annotate(element, getHighlighterOptions(element));
  annotation.show();

  const resizeObserver = new ResizeObserver(() => {
    annotation.hide();
    annotation.show();
  });

  resizeObserver.observe(element);
  resizeObserver.observe(document.body);
}

function initHighlighter(element) {
  if (element.dataset.highlightReady === 'true') return;
  element.dataset.highlightReady = 'true';

  const reveal = () => mountHighlighter(element);

  if (element.dataset.highlightInview === 'true') {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, { rootMargin: '-10%', threshold: 0 });

    observer.observe(element);
    return;
  }

  reveal();
}

document.querySelectorAll('[data-highlighter]').forEach(initHighlighter);
