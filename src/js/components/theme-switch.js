export function initThemeSwitch() {
    const toggle = document.getElementById("theme-toggle");
    const iconStatus = document.getElementById("theme-status-icon");
    const status = document.getElementById("theme-status");

    let theme = localStorage.getItem("theme");

    if (!theme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = prefersDark ? "dark" : "light";
    }

    applyTheme(theme);

    toggle.addEventListener("change", () => {
        const newTheme = toggle.checked ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);

        if (theme === "dark") {
            toggle.checked = true;
            status.textContent = "Modo oscuro activado";
            iconStatus.textContent = "🌜";
        } else {
            toggle.checked = false;
            status.textContent = "Modo claro activado";
            iconStatus.textContent = "🌞";
        }
    }
}