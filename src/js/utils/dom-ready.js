export function domReady(fn) {
    if (document.readyState !== 'loading') {
        document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
        fn();
    }
}
