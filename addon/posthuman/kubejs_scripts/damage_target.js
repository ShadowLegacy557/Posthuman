StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:damage_target')
        .addProperty('damage', 'integer', 2, 'the amount of damage to deal to the target')
        .addProperty('range', 'integer', 5, 'the range at which you can damage the target')
        .addProperty('damage_source', 'string', 'player', 'the source of the damage (player, mob, magic, explosion, etc.)')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let damage = entry.getPropertyByName('damage')
                let range = entry.getPropertyByName('range')
                let damage_source = entry.getPropertyByName('damage_source')
                let target = entity.rayTrace(range).entity
                if (target !== null) {
                    target.attackEntityFrom(damage_source, damage)
                }
            }
        })
})