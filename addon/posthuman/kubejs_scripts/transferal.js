StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:transferal')
        .addProperty('power', 'string', 'posthuman:transferal', 'the power to transfer to the target entity.')
        .addProperty('range', 'float', 10, 'the range at which the transferal can occur.')
        .addProperty('tag', 'string', 'posthuman.pastuser', 'the tag that is applied to the entity when this ability is active.')
        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                let range = entry.getPropertyByName('range')
                let target = entity.rayTrace(range).entity
                let power = entry.getPropertyByName('power')
                let tag = entry.getPropertyByName('tag')
                if (target !== null && target.isPlayer()) {
                    if (target.tags.contains(tag)) {
                        return
                    } else {
                        palladium.superpowers.addSuperpower(target, power)
                        palladium.superpowers.removeSuperpower(entity, power)
                        entity.tags.add(tag)
                    }
                }
            }
        })
})

//made by Owen(ShadowLegacy557) with help from Codecreality