import { combatScene } from "../scenes/combatScene";
import { setupAbandonButton } from "../ui/abandonBtn";
import { Application } from "pixi.js";
import { Player } from "../entities/Player";
import { Mob } from "../entities/Mob";
import { toggleHUD, toggleCombatHUD } from "../ui/HUD";
import { mainScene } from "../scenes/mainScene";
import { GameState } from "../state/gameState";
import { quests } from "../quests/questsData";
import { getRandomInt } from "../utils/utils";

export async function startCombat(mobType: string) {
    // Récupérer l'instance globale de GameState
    const gameState = await GameState.getInstance();
    const player = gameState.player;

    // Trouver la quête correspondante
    const quest = quests.find((q) => q.mobType === mobType);
    if (!quest) {
        console.error("Quête introuvable !");
        return;
    }

    // Initialiser la scène de combat et récupérer app, player et mob
    const { app, mob } = await combatScene(mobType);

    // Réinitialiser les HP du joueur et du mob
    player.currentHP = player.maxHP;
    mob.currentHP = mob.maxHP;

    // Mettre à jour la barre de vie du joueur
    player.updateHealthBar();

    // Configurer le bouton "Abandonner"
    setupAbandonButton(app, player, mob);

    // Initialiser le tour
    let isPlayerTurn = true;

    // Boolean pour vérifier si le combat est terminé
    let isCombatOver = false;

    // Gestion du bouton "Attaquer"
    const attackButton = document.getElementById("attack-button");
    if (attackButton) {
        const newAttackButton = attackButton.cloneNode(true) as HTMLElement;
        attackButton.parentNode?.replaceChild(newAttackButton, attackButton);

        newAttackButton.addEventListener("click", () => {
            if (isPlayerTurn) {
                // Le joueur attaque le mob
                player.attackTarget(mob);

                // Mettre à jour la barre de vie du mob
                mob.updateHealthBar();

                // Vérifier si le mob est mort
                if (mob.currentHP <= 0 && !isCombatOver) {
                    isCombatOver = true; // Marquer le combat comme terminé
                    mob.removeHealthBar(); // Supprimer la barre de vie
                    console.log("Le mob est vaincu !");
                    // Générer une récompense aléatoire en gold
                    const goldEarned = getRandomInt(quest.goldReward[0], quest.goldReward[1]);
                    player.addGold(goldEarned); // Ajouter les gold au joueur
                    // Générer une récompense aléatoire en XP
                    const xpEarned = getRandomInt(quest.xpReward[0], quest.xpReward[1]);
                    player.gainXP(xpEarned);
                    console.log(`Vous avez gagné ${goldEarned} pièces d'or et ${xpEarned} XP !`);
                    showQuestSuccessWindow(app, player, mob, goldEarned, xpEarned); // Afficher la fenêtre de réussite
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
            if (player.currentHP <= 0 && !isCombatOver) {
                isCombatOver = true; // Marquer le combat comme terminé
                mob.removeHealthBar(); // Supprimer la barre de vie
                console.log("Vous avez été vaincu !");
                endCombat(app, player, mob);
                return;
            }

            // Passer au tour du joueur
            isPlayerTurn = true;
            console.log("C'est à votre tour !");
        }
    }

    function showQuestSuccessWindow(app: Application, player: Player, mob: Mob, goldEarned: number, xpEarned: number) {
        const successWindow = document.getElementById("quest-success-window");
        if (successWindow) {
            successWindow.classList.add("visible");

            // Ajouter le texte de la récompense
            successWindow.innerHTML = `
                <div class="success-content">
                    <h2>Quête complétée !</h2>
                    <p>Vous avez vaincu ${mob.name} !</p>
                    <div class="quest-rewards">
                        <div class="quest-gold-reward">
                            <img src="/assets/gold.png" alt="Gold" class="gold-icon">
                            <p class="quest-gold-reward-text">${goldEarned} pièces d'or</p>
                        </div>
                        <div class="quest-xp-reward">
                            <p class="quest-xp-reward-text">${xpEarned} XP</p>
                        </div>
                    </div>
                    <button id="close-success-button">Rentrer</button>
                </div>
            `;

            // Ajouter un gestionnaire pour fermer la fenêtre
            const closeButton = document.getElementById("close-success-button");
            if (closeButton) {
                // Supprimer les gestionnaires existants
                const newCloseButton = closeButton.cloneNode(true) as HTMLElement;
                closeButton.parentNode?.replaceChild(newCloseButton, closeButton);

                // Ajouter un nouveau gestionnaire d'événements
                newCloseButton.addEventListener("click", () => {
                    successWindow.classList.remove("visible");
                    endCombat(app, player, mob); // Appeler endCombat après avoir fermé la fenêtre
                });
            }
        }
    }

    function endCombat(app: Application, player: Player, mob: Mob) {
        // Nettoyer la scène de combat
        app.stage.removeChild(player.sprite);
        app.stage.removeChild(mob.sprite);


        // Arrêter l'application PixiJS
        app.destroy(true, { children: true });

        const pixiContainer = document.getElementById("pixi-container");
        if (pixiContainer) {
            pixiContainer.innerHTML = ""; // Vide complètement le container
        }


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