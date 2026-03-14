StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:dynamic_attribute')
        .addProperty('property', 'string', 'posthuman.speedLevel', 'the name of the property being used')
        .addProperty('intervals', 'string_array', [0, 1, 2, 3, 4, 5], 'the different values for each interval')
        .addProperty('amount', 'float', 0.5, 'the amount to be added at each level')
        .addProperty('attribute', 'string', 'minecraft:generic.movement_speed', 'the attribute to modify')
        .addProperty('operation', 'string', 'add', 'add or remove from attribute')
        .addProperty('uuid', 'string', 'b5663241-c696-49d9-b6ac-26d00b682a68', 'the uuid used for the attribute')
        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                let prop = entry.getPropertyByName('property')
                let attribute = entry.getPropertyByName('attribute')
                let operation = entry.getPropertyByName('operation')
                let intervals = entry.getPropertyByName('intervals')
                let amount = entry.getPropertyByName('amount')
                let uuid = entry.getPropertyByName('uuid')
                intervals
                intervals.forEach(num => {
                    if (num === palladium.getProperty(entity, prop)) {
                        let fullAmount = amount * num
                        if (operation === 'add') {
                            entity.modifyAttribute(attribute, uuid, fullAmount, 'ADDITION')
                        }
                        if (operation === 'remove') {
                            entity.modifyAttribute(attribute, uuid, fullAmount * -1, 'ADDITION')
                        }
                        else return
                    } else return
                })
            }
        })
}) // Made by ShadowLegacy557