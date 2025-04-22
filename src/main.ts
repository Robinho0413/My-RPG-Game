import { setupQuestWindow } from "./quests/questsUI";
import { mainScene } from "./scenes/mainScene";

(async () => {
  mainScene();
})();

// Fonction pour gérer le panneau de quêtes
setupQuestWindow();
