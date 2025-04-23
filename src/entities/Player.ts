import { Sprite, Texture } from "pixi.js";
import { Mob } from "./Mob";

export class Player {
    sprite: Sprite;
    maxHP: number;
    currentHP: number;
    attack: number;
    defense: number;
    gold: number;
    level: number;

    constructor(texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);

        this.maxHP = 200;
        this.currentHP = 200;
        this.attack = 10;
        this.defense = 0;
        this.gold = 0;
        this.level = 1;
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

    addGold(amount: number) {
        this.gold += amount;
        console.log(`Vous gagnez ${amount} pièces d'or. Total : ${this.gold}`);

        // Mettre à jour l'affichage des pièces d'or
        const goldDisplay = document.getElementById("gold-amount");
        if (goldDisplay) {
            goldDisplay.textContent = `${this.gold}`;
        }
    }

    spendGold(amount: number): boolean {
        if (this.gold >= amount) {
            this.gold -= amount;
            console.log(`Vous dépensez ${amount} pièces d'or. Total restant : ${this.gold}`);
    
            // Mettre à jour l'affichage des pièces d'or
            const goldDisplay = document.getElementById("gold-amount");
            if (goldDisplay) {
                goldDisplay.textContent = `${this.gold}`;
            }
    
            return true;
        } else {
            console.log("Vous n'avez pas assez de pièces d'or !");
            return false;
        }
    }
}