import { Player } from "../entities/Player";
import { Texture } from "pixi.js";

export class GameState {
    private static instance: GameState;
    public player: Player;

    private constructor() {
        // Initialiser le joueur avec une texture
        const playerTexture = Texture.from("/assets/player.png");
        this.player = new Player(playerTexture);
    }

    public static getInstance(): GameState {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }
}