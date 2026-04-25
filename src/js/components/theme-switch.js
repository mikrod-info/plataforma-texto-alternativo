export function initThemeSwitch() {
    const status = document.getElementById("theme-status");
    const toggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        toggle.checked = savedTheme === "dark";
    }

    toggle.addEventListener("change", () => {
        const theme = toggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        status.textContent = theme === "dark"
        ? "Modo oscuro activado"
        : "Modo claro activado";
    });

    if (!localStorage.getItem("theme")) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
}