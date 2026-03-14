StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:prop_adjust_num')
    .addProperty('prop', 'string', 'FLAMECOLOUR', 'the name of the property')
    .addProperty('amount', 'integer', 1, 'amount to adjust by')
    .addProperty('mode', 'string', 'add', 'add, subtract, multiply, divide, set, power')
    .addProperty('num2', 'integer', 2, 'max value for add, min value for subtract.')
    .addProperty('num3', 'integer', 0, 'reset value for add or subtract.')
    .addProperty('reset', 'boolean', false, 'whether to reset after max/min value')

    .tick((entity, entry, holder, enabled) => {
        if (enabled && entity.isPlayer()) {
            let prop = entry.getPropertyByName('prop')
            let amount = entry.getPropertyByName('amount')
            let mode = entry.getPropertyByName('mode')
            let num2 = entry.getPropertyByName('num2')
            let num3 = entry.getPropertyByName('num3')
            let reset = entry.getPropertyByName('reset')
            let player = entity
            if (mode === 'add') {
                if (palladium.getProperty(player, prop) < num2) {
                    palladium.setProperty(player, prop, palladium.getProperty(player, prop) + amount)
                }
                else if (reset === true && palladium.getProperty(player, prop) === num2) {
                    palladium.setProperty(player, prop, num3)
                }
            }
            else if (mode === 'subtract') {
                if (palladium.getProperty(player, prop) > num2) {
                    palladium.setProperty(player, prop, palladium.getProperty(player, prop) - amount)
                }
                else if (reset === true && palladium.getProperty(player, prop) === num2) {
                    palladium.setProperty(player, prop, num3)
                }
            }
            else if (mode === 'set') {
                palladium.setProperty(player, prop, amount)
            }
            else if (mode === 'multiply') {
                palladium.setProperty(player, prop, palladium.getProperty(player, prop) * amount)
            }
            else if (mode === 'divide') {
                palladium.setProperty(player, prop, palladium.getProperty(player, prop) / amount)
            }
            else if (mode === 'power') {
                palladium.setProperty(player, prop, palladium.getProperty(player, prop) ^ amount)
            }
        }
    })
}) // made by ShadowLegacy557
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:prop_adjust_string')
        .addProperty('prop', 'string', 'posthuman.currentPower', 'The name of the property')
        .addProperty('value', 'string', 'empty', 'The value to set the property to')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let prop = entry.getPropertyByName('prop')
                let value = entry.getPropertyByName('value')
                palladium.setProperty(entity, prop, value)
            }
        })
}) // made by ShadowLegacy557
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:prop_tell')
        .addProperty('prop', 'string', 'posthuman.flameLevel', 'the name of the property to check')
        .addProperty('message', 'string', 'Your flame level is: ', 'the message to display before the property value')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                const prop = entry.getPropertyByName('prop')
                const message = entry.getPropertyByName('message')
                let propValue = palladium.getProperty(entity, prop)
                entity.setStatusMessage('§6' + message + propValue)
            }
        })
}) // made by ShadowLegacy557