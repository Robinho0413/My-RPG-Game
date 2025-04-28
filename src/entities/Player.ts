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
    currentXP: number;
    xpToNextLevel: number;

    constructor(texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);

        this.maxHP = 100;
        this.currentHP = 100;
        this.attack = 10;
        this.defense = 0;
        this.gold = 0;
        this.level = 1;
        this.currentXP = 0;
        this.xpToNextLevel = 100;
    }

    takeDamage(amount: number) {
        this.currentHP = Math.max(0, this.currentHP - amount);
        console.log(`Vous subissez ${amount} dégâts, il vous reste ${this.currentHP} HP`);
        this.updateHealthBar(); // Mettre à jour la barre de vie
    }

    heal(amount: number) {
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
        this.updateHealthBar(); // Mettre à jour la barre de vie
    }

    getHPRatio(): number {
        return this.currentHP / this.maxHP;
    }

    updateHealthBar() {
        const healthBar = document.getElementById("health-bar");
        const healthText = document.getElementById("health-text");
    
        if (healthBar && healthText) {
            const healthPercentage = (this.currentHP / this.maxHP) * 100;
            healthBar.style.width = `${healthPercentage}%`;
            healthText.textContent = `${this.currentHP} / ${this.maxHP}`;
        }
    }

    updateLevelDisplay() {
        const levelText = document.getElementById("level-text");
        if (levelText) {
            levelText.textContent = `Niveau : ${this.level}`;
        }
    }

    updateLevelProgress(currentXP: number, xpToNextLevel: number) {
        const levelBar = document.getElementById("level-bar");
        const levelProgressText = document.getElementById("level-progress-text");
    
        if (levelBar && levelProgressText) {
            const progressPercentage = (currentXP / xpToNextLevel) * 100;
            levelBar.style.width = `${progressPercentage}%`;
            levelProgressText.textContent = `${currentXP} / ${xpToNextLevel}`;
        }
    }

    gainXP(amount: number) {
        this.currentXP += amount;
    
        // Vérifier si le joueur monte de niveau
        if (this.currentXP >= this.xpToNextLevel) {
            this.levelUp();
        }
    
        // Mettre à jour la barre de progression
        this.updateLevelProgress(this.currentXP, this.xpToNextLevel);
    }
    
    levelUp() {
        this.level += 1;
        this.currentXP = this.currentXP - this.xpToNextLevel; // Conserver l'excès d'XP
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5); // Augmenter l'XP nécessaire pour le prochain niveau
    
        console.log(`Félicitations ! Vous êtes maintenant niveau ${this.level}`);
        this.updateLevelDisplay(); // Mettre à jour l'affichage du niveau
        this.updateLevelProgress(this.currentXP, this.xpToNextLevel); // Mettre à jour la barre de progression
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