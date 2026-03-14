StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:set_fire')
        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                entity.setSecondsOnFire(1)
            } else return
        })
})