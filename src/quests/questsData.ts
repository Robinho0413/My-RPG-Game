import { startCombat } from "../combat/combat";

export type Quest = {
    id: string;
    title: string;
    description: string;
    mobType: string;
    onStart: () => void;
};

export const quests: Quest[] = [
    {
        id: "gobelin_1",
        title: "Chasser le gobelin",
        description: "Un gobelin rôde près du village. Élimine-le.",
        mobType: "Gobelin",
        onStart: () => {
            startCombat("Gobelin");
        },
    },
    {
        id: "loup_1",
        title: "Traquer les loups",
        description: "Un groupe de loups menace les récoltes. Interviens !",
        mobType: "Loup",
        onStart: () => {
            startCombat("Loup");
        },
    },
    {
        id: "voleur_1",
        title: "Traquer les voleurs",
        description: "Un groupe de voleurs menace les villageois. Interviens !",
        mobType: "Voleur",
        onStart: () => {
            console.log("Combat contre un voleur lancé !");
        },
    },
    {
        id: "pirate_1",
        title: "Traquer les pirates",
        description: "Un groupe de pirates menace les récoltes. Interviens !",
        mobType: "Pirate",
        onStart: () => {
            console.log("Combat contre un pirate lancé !");
        },
    },
    {
        id: "demon_1",
        title: "Traquer les démons",
        description: "Un groupe de démons menace les maisons. Interviens !",
        mobType: "Démon",
        onStart: () => {
            console.log("Combat contre un démon lancé !");
        },
    },
];
