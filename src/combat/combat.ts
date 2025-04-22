import { combatScene } from "../scenes/combatScene";
import { setupAbandonButton } from "../ui/abandonBtn";
import { Application } from "pixi.js";
import { Player } from "../entities/Player";
import { Mob } from "../entities/Mob";
import { toggleHUD, toggleCombatHUD } from "../ui/HUD";
import { mainScene } from "../scenes/mainScene";

export async function startCombat(mobType: string) {
    // Initialiser la scène de combat et récupérer app, player et mob
    const { app, player, mob } = await combatScene(mobType);

    // Configurer le bouton "Abandonner"
    setupAbandonButton(app, player, mob);

    // Initialiser le tour
    let isPlayerTurn = true;

    // Gestion du bouton "Attaquer"
    const attackButton = document.getElementById("attack-button");
    if (attackButton) {
        attackButton.addEventListener("click", () => {
            if (isPlayerTurn) {
                // Le joueur attaque le mob
                player.attackTarget(mob);

                // Vérifier si le mob est mort
                if (mob.currentHP <= 0) {
                    console.log("Le mob est vaincu !");
                    endCombat(app, player, mob);
                    return;
                }

                // Passer au tour du mob
                isPlayerTurn = false;
                setTimeout(() => {
                    mobTurn();
                }, 1000); // Petite pause avant que le mob attaque
            } else {
                console.log("Ce n'est pas votre tour !");
            }
        });
    }

    function mobTurn() {
        if (!isPlayerTurn) {
            // Le mob attaque le joueur
            mob.attackPlayer(player);

            // Vérifier si le joueur est mort
            if (player.currentHP <= 0) {
                console.log("Vous avez été vaincu !");
                endCombat(app, player, mob);
                return;
            }

            // Passer au tour du joueur
            isPlayerTurn = true;
            console.log("C'est à votre tour !");
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
        
        console.log("Combat terminé !");
    }
}