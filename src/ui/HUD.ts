export function toggleCombatHUD(visible: boolean) {
    const combatHUD = document.getElementById("combat-hud");
    if (combatHUD) {
        if (visible) {
            combatHUD.classList.remove("hidden");
            combatHUD.classList.add("visible");
        } else {
            combatHUD.classList.remove("visible");
            combatHUD.classList.add("hidden");
        }
    }
}

export function toggleHUD(visible: boolean) {
    const hud = document.getElementById("bottom-nav");
    if (hud) {
        if (visible) {
            hud.classList.remove("hidden");
            hud.classList.add("visible");
        } else {
            hud.classList.remove("visible");
            hud.classList.add("hidden");
        }
    }
}