import { quests } from "./questsData";

// Fonction pour afficher la liste
export function renderQuestList() {
    const container = document.getElementById("quest-list")!;
    container.innerHTML = "";

    quests.forEach((quest) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("quest-item");
        wrapper.innerHTML = `
        <h3>${quest.title}</h3>
        <p>${quest.description}</p>
        <button class="start-button">Accepter la quête</button>
      `;

        wrapper.querySelector("button")?.addEventListener("click", () => {
            quest.onStart();
            document.getElementById("quest-window")?.classList.add("hidden");
        });

        container.appendChild(wrapper);
    });
}

export function setupQuestWindow() {
    const questTabBtn = document.getElementById("tab-quests");
    const questWindow = document.getElementById("quest-window");
    const closeQuestBtn = document.getElementById("close-quest");

    questTabBtn?.addEventListener("click", () => {
        if (!questWindow) return;

        const isVisible = !questWindow.classList.contains("hidden");

        if (isVisible) {
            questWindow.classList.add("hidden");
        } else {
            renderQuestList();
            questWindow.classList.remove("hidden");
        }
    });

    closeQuestBtn?.addEventListener("click", () => {
        questWindow?.classList.add("hidden");
    });
}
