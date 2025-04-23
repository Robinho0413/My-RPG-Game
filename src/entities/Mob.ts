import { Sprite, Texture } from "pixi.js";

export class Mob {
    name: string;
    sprite: Sprite;
    maxHP: number;
    currentHP: number;
    attack: number;
    healthBarContainer: HTMLDivElement | null = null;
    healthBar: HTMLDivElement | null = null;

    constructor(texture: Texture, name: string = "Mob") {
        this.name = name;
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(3);

        this.maxHP = 50;
        this.currentHP = 50;
        this.attack = 10;

        // Créer la barre de vie
        this.createHealthBar();
    }

    createHealthBar() {
        // Créer le conteneur de la barre de vie
        this.healthBarContainer = document.createElement("div");
        this.healthBarContainer.className = "mob-health-bar-container";

        // Créer la barre de vie
        this.healthBar = document.createElement("div");
        this.healthBar.className = "mob-health-bar";

        // Ajouter la barre de vie au conteneur
        this.healthBarContainer.appendChild(this.healthBar);

        // Ajouter le conteneur au document
        document.body.appendChild(this.healthBarContainer);
    }

    updateHealthBar() {
        if (this.healthBar && this.healthBarContainer) {
            const healthPercentage = (this.currentHP / this.maxHP) * 100;
            this.healthBar.style.width = `${healthPercentage}%`;

            // Positionner la barre de vie au-dessus de la tête du mob
            const mobPosition = this.sprite.getGlobalPosition();
            this.healthBarContainer.style.left = `${mobPosition.x - 50}px`; // Centrer la barre
            this.healthBarContainer.style.top = `${mobPosition.y - 60}px`; // Positionner au-dessus
        }
    }

    removeHealthBar() {
        if (this.healthBarContainer) {
            this.healthBarContainer.remove();
            this.healthBarContainer = null;
            this.healthBar = null;
        }
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
