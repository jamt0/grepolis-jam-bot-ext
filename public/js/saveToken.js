console.log("Cargando variable game");
console.log({ Game });
console.log({ MM });
window.postMessage(
  {
    type: "FROM_PAGE",
    csrfToken: Game.csrfToken,
    world_id: Game.world_id,
    townId: Game.townId,
  },
  "*"
);

window.localStorage.setItem(
  "game",
  JSON.stringify({
    csrfToken: Game.csrfToken,
    world_id: Game.world_id,
    townId: Game.townId,
  })
);

console.log("Enviando variables de grepolis");
