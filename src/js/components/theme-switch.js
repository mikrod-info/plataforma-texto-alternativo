// export function initThemeSwitch() {
//     const status = document.getElementById("theme-status");
//     const toggle = document.getElementById("theme-toggle");
//
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//         document.documentElement.setAttribute("data-theme", savedTheme);
//         toggle.checked = savedTheme === "dark";
//     }
//
//     toggle.addEventListener("change", () => {
//         const theme = toggle.checked ? "dark" : "light";
//         document.documentElement.setAttribute("data-theme", theme);
//         localStorage.setItem("theme", theme);
//
//         status.textContent = theme === "dark"
//         ? "Modo oscuro activado"
//         : "Modo claro activado";
//     });
//
//     if (!localStorage.getItem("theme")) {
//         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//         document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
//     }
// }

export function initThemeSwitch() {
    const toggle = document.getElementById("theme-toggle");
    const iconStatus = document.getElementById("theme-status-icon");
    const status = document.getElementById("theme-status");

    let theme = localStorage.getItem("theme");

    if (!theme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = prefersDark ? "dark" : "light";
    }

    toggle.checked = theme === "dark";
    applyTheme(theme);

    toggle.addEventListener("change", () => {
        const newTheme = toggle.checked ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);

        if (theme === "dark") {
            status.textContent = "Modo oscuro activado";
            iconStatus.textContent = "🌜";
        } else {
            status.textContent = "Modo claro activado";
            iconStatus.textContent = "🌞";
        }
    }
}