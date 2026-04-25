export function initNavMenu() {
    const nav = document.querySelector("[data-nav]");
    if (!nav || nav.dataset.navInit === "true") return;
    nav.dataset.navInit = "true";

    const button = nav.querySelector("[data-nav-toggle]");
    if (!button) return;

    const setOpen = (open) => {
        const value = open ? "true" : "false";
        nav.dataset.open = value;
        button.setAttribute("aria-expanded", value);
    };

    button.addEventListener("click", () =>
        setOpen(nav.dataset.open !== "true")
    );

    nav.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setOpen(false);
            button.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (nav.dataset.open === "true" && !nav.contains(event.target)){
            setOpen(false);
        }
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });

    setOpen(false);
}