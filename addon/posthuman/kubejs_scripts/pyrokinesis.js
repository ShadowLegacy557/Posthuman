StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:set_fire')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.tags.contains('posthuman.pyrokinesisBody')) {
                entity.setSecondsOnFire(1)
            } else return
        })
})