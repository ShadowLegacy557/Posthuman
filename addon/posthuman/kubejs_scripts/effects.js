StartupEvents.registry('mob_effect', event => {
  event.create('posthuman:stamina')
    .effectTick((entity, lvl) => {
      if (!entity.server) return
      superpowerUtil.addSuperpower(entity, "posthuman:effect");
    })
    .color(0xcb0101)
}) 