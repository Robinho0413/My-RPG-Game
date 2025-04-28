import { Application } from "pixi.js";
import { toggleHUD, toggleCombatHUD } from "../ui/HUD";
import { GameState } from "../state/gameState";

export async function mainScene() {
    toggleHUD(true); // Afficher le HUD principal
    toggleCombatHUD(false); // Masquer le HUD de combat

    // Créer une nouvelle application PixiJS
    const app = new Application();

    // Initialiser l'application
    await app.init({ background: "#1099bb", resizeTo: window });

    // Ajouter le canvas de l'application au conteneur PixiJS
    document.getElementById("pixi-container")!.appendChild(app.canvas);

    // Charger la texture du joueur
    //const texture = await Assets.load("/assets/player.png");

    // Récupérer l'instance globale du joueur
    const gameState = await GameState.getInstance();
    const player = gameState.player;
    player.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(player.sprite);
    // Initialiser l'affichage du niveau et de la progression
    player.updateLevelDisplay();
    player.updateLevelProgress(player.currentXP, player.xpToNextLevel);
}