import { Application, Assets } from "pixi.js";
import { toggleHUD, toggleCombatHUD } from "../ui/HUD";
import { Player } from "../entities/Player";
import { Mob } from "../entities/Mob";

export async function combatScene(mobType: string): Promise<{ app: Application; player: Player; mob: Mob }> {
    // Masquer le HUD principal et afficher le HUD de combat
    toggleHUD(false);
    toggleCombatHUD(true);

    // Créer une nouvelle application PixiJS
    const app = new Application();

    // Initialiser l'application
    await app.init({ background: "#003022", resizeTo: window })

    // Remplacer le contenu de "pixi-container" par la nouvelle scène
    const pixiContainer = document.getElementById("pixi-container");
    if (pixiContainer) {
        pixiContainer.innerHTML = ""; // Efface le contenu précédent
        pixiContainer.appendChild(app.canvas); // Ajoute le canvas de l'application
    }

    // Charger les textures
    const playerTexture = await Assets.load("/assets/player.png");
    const mobTexture = await Assets.load(`/assets/${mobType.toLowerCase()}.png`);

    // Créer le joueur
    const player = new Player(playerTexture);
    player.sprite.position.set(app.screen.width / 2 - 200, app.screen.height / 2);
    app.stage.addChild(player.sprite);
    player.currentHP = player.maxHP;
    player.updateHealthBar();

    // Créer le mob
    const mob = new Mob(mobTexture, mobType);
    mob.sprite.position.set(app.screen.width / 2 + 200, app.screen.height / 2);
    mob.sprite.scale.set(0.2);
    app.stage.addChild(mob.sprite);
    mob.currentHP = mob.maxHP;

    // Retourner les objets nécessaires
    return { app, player, mob };
}