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

// OFA Transfer
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:ofa_transfer')
        .addProperty('max', 'integer', 5, 'the max amount of powers to join')
        .addProperty('range', 'integer', 3, 'the max range of transfer')
        .addProperty('tag', 'string', 'posthuman.pastUser', 'the tag given to prevent back-transfering')
        .addProperty('power', 'string', 'posthuman:transfer', 'the main transfer power')
        .addProperty('prop', 'string', 'posthuman.storedPowers', 'the name of the string_array palladium property to store powers')
        .addProperty('embers', 'boolean', false, 'whether or not to leave embers of the power behind (requires setup in power)')
        .addProperty('ember_tag', 'string', 'posthuman.transferEmbers', 'the tag to give when transfering. only required if embers is true')
        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                let max = entry.getPropertyByName('max')
                let range = entry.getPropertyByName('range')
                let tag = entry.getPropertyByName('tag')
                let power = entry.getPropertyByName('power')
                let prop = entry.getPropertyByName('prop')
                let emberTag = entry.getPropertyByName('ember_tag')
                let target = entity.rayTrace(range).entity
                function embers(targetEntity, tagGiven, emberPower) {
                    if (entry.getPropertyByName('embers') == true) {
                        targetEntity.tags.add(tagGiven)
                    } else if (entry.getPropertyByName('embers') == false) {
                        palladium.superpowers.removeSuperpower(targetEntity, emberPower)
                    }
                }
                if (target != null && !target.tags.contains(tag)) {
                    let currentPowers = palladium.getProperty(entity, prop)
                    if (currentPowers.length == max) {
                        palladium.superpowers.addSuperpower(target, power)
                        entity.tags.add(tag)
                        embers(entity, emberTag, power)
                    } else if (max > currentPowers.length > 0) {} else if (palladium.powers.getPowerIdsForNamespace(target, 'posthuman').length > 0) {
                        palladium.setProperty(target, prop, currentPowers.concat())
                    } else {
                        palladium.superpowers.addSuperpower(target, power)
                        entity.tags.add(tag)
                        embers(entity, emberTag, power)
                    }
                } else return
            }
        })
})