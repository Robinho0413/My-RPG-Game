import { Application } from "pixi.js";
import { Player } from "../entities/Player";
import { Mob } from "../entities/Mob";
import { toggleHUD, toggleCombatHUD } from "../ui/HUD";
import { mainScene } from "../scenes/mainScene";

export function setupAbandonButton(app: Application, player: Player, mob: Mob) {
    const abandonButton = document.getElementById("combat-abandon");
    if (abandonButton) {
        // Supprimer tous les gestionnaires d'événements existants
        const newAbandonButton = abandonButton.cloneNode(true) as HTMLElement;
        abandonButton.parentNode?.replaceChild(newAbandonButton, abandonButton);

        // Ajouter un gestionnaire d'événements pour le bouton "Abandonner"
        newAbandonButton.addEventListener("click", () => {
            endCombat(app, player, mob);
        });

        // Rendre le bouton visible
        newAbandonButton.classList.remove("hidden");
    }
}

function endCombat(app: Application, player: Player, mob: Mob) {
    // Nettoyer la scène de combat
    app.stage.removeChild(player.sprite);
    app.stage.removeChild(mob.sprite);

    // Arrêter l'application PixiJS
    app.destroy(true, { children: true });

    // Masquer le bouton "Abandonner"
    const abandonButton = document.getElementById("combat-abandon");
    if (abandonButton) {
        abandonButton.classList.add("hidden");
    }

    // Afficher le HUD principal et masquer le HUD de combat
    toggleHUD(true);
    toggleCombatHUD(false);

    // Revenir à la scène principale
    mainScene();
}