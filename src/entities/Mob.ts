import { Sprite, Texture } from "pixi.js";

export class Mob {
    name: string;
    sprite: Sprite;
    maxHP: number;
    currentHP: number;
    attack: number;

    constructor(texture: Texture, name: string = "Mob") {
        this.name = name;
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(3);

        this.maxHP = 50;
        this.currentHP = 50;
        this.attack = 10;
    }

    takeDamage(amount: number) {
        this.currentHP = Math.max(0, this.currentHP - amount);
        console.log(`${this.name} subit ${amount} dégâts, il lui reste ${this.currentHP} HP`);
    }

    attackPlayer(player: { takeDamage: (amount: number) => void; name?: string }) {
        console.log(`${this.name} attaque le joueur avec ${this.attack} de dégâts`);
        player.takeDamage(this.attack);
    }
}
