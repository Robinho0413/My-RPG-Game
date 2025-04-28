import { Player } from "../entities/Player";
import { Assets } from "pixi.js";

export class GameState {
    private static instance: GameState;
    public player!: Player;

    private constructor() {}

    public static async getInstance(): Promise<GameState> {
        if (!GameState.instance) {
            GameState.instance = new GameState();

            // Charger la texture du joueur
            const playerTexture = await Assets.load("/assets/player.png");

            // Initialiser le joueur avec la texture chargée
            GameState.instance.player = new Player(playerTexture);
        }
        return GameState.instance;
    }
}