import { Sprite, Texture } from "pixi.js";
import { Mob } from "./Mob";

export class Player {
    sprite: Sprite;
    maxHP: number;
    currentHP: number;
    attack: number;
    defense: number;

    constructor(texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);

        this.maxHP = 100;
        this.currentHP = 100;
        this.attack = 10;
        this.defense = 10;
    }

    takeDamage(amount: number) {
        this.currentHP = Math.max(0, this.currentHP - amount);
        console.log(`Vous subissez ${amount} dégâts, il vous reste ${this.currentHP} HP`);
    }

    heal(amount: number) {
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
    }

    getHPRatio(): number {
        return this.currentHP / this.maxHP;
    }

    attackTarget(target: Mob) {
        console.log(`${this.constructor.name} attaque avec ${this.attack} de dégâts !`);
        target.takeDamage(this.attack);
    }
}