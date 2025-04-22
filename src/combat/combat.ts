import { combatScene } from "../scenes/combatScene";
import { setupAbandonButton } from "../ui/abandonBtn";

export async function startCombat(mobType: string) {
    // Initialiser la scène de combat et récupérer app, player et mob
    const { app, player, mob } = await combatScene(mobType);

    // Configurer le bouton "Abandonner"
    setupAbandonButton(app, player, mob);

    // Simuler un combat
    setTimeout(() => {
        player.attackTarget(mob);
    }, 1000);

    setTimeout(() => {
        mob.attackPlayer(player);
    }, 3000);
}