StartupEvents.registry('palladium:abilities', event => {
    event.create('posthuman:tag')
        .addProperty('tag', 'string', 'posthuman.exampleTag', 'The tag to modify')
        .addProperty('mode', 'string', 'add', 'The operation to perform on the tag (add or remove)')
        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                let tag = entry.getPropertyByName('tag')
                let mode = entry.getPropertyByName('mode')
                if (mode === 'add' && !entity.tags.contains(tag)) {
                    entity.tags.add(tag)
                } else if (mode === 'remove' && entity.tags.contains(tag)) {
                    entity.tags.remove(tag)
                }
            }
        })
}) // made by ShadowLegacy557
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
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:score')
        .icon(palladium.createItemIcon('minecraft:blaze_rod'))
        .addProperty('score', 'string', 'example_score', 'Name of the scoreboard to modify')
        .addProperty('adjustment_type', 'string', 'add', 'add, subtract or set')
        .addProperty('adjustment_amount', 'integer', 1, 'The amount you want to adjust the score by')
        .addProperty('max_score', 'integer', 10, 'Maximum score allowed (When using ADD mode)')
        .addProperty('min_score', 'integer', 0, 'Minimum score allowed (When using SUBTRACT mode)')

        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let scoreName = entry.getPropertyByName('score');
                let adjustmentType = entry.getPropertyByName('adjustment_type');
                let adjustmentAmount = entry.getPropertyByName('adjustment_amount');
                let max = entry.getPropertyByName('max_score');
                let min = entry.getPropertyByName('min_score');
                if (adjustmentType === 'add' && palladium.scoreboard.getScore(entity, scoreName) + adjustmentAmount <= max) {
                    palladium.scoreboard.addScore(entity, scoreName, adjustmentAmount);
                } 
                else if (adjustmentType === 'subtract' && palladium.scoreboard.getScore(entity, scoreName) - adjustmentAmount >= min) {
                    palladium.scoreboard.subtractScore(entity, scoreName, adjustmentAmount);
                } 
                else if (adjustmentType === 'set') {
                    palladium.scoreboard.setScore(entity, scoreName, adjustmentAmount);
                }
            }
        });
}); // Made by Bosatron04
// modified by ShadowLegacy557
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:set_pdata_boolean')
        .addProperty('data', 'string', 'first_join', 'the persistent data boolean to set')
        .addProperty('value', 'boolean', true, 'the value to set the persistent data to')
        .tick((entity, entry, holder, enabled) => {
            let data = entry.getPropertyByName('data')
            let val = entry.getPropertyByName('value')
            if (enabled && entity.persistentData.getBoolean(data) != val) {
                entity.persistentData.putBoolean(data, val)
            }
        })
})
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:set_pdata_string')
        .addProperty('data', 'string', 'dataKey', 'the persistent data to set')
        .addProperty('value', 'string', 'dataValue', 'the value to set the persistent data to')
        .tick((entity, entry, holder, enabled) => {
            let data = entry.getPropertyByName('data')
            let val = entry.getPropertyByName('value')
            if (enabled && entity.persistentData.get(data) != val) {
                entity.persistentData.put(data, val)
            }
        })
})
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:set_pdata_number')
        .addProperty('data', 'string', 'dataKey', 'the persistent data to set')
        .addProperty('value', 'float', 0, 'the value to set the persistent data to')
        .tick((entity, entry, holder, enabled) => {
            let data = entry.getPropertyByName('data')
            let val = entry.getPropertyByName('value')
            if (enabled && entity.persistentData.get(data) != val) {
                entity.persistentData.put(data, val)
            }
        })
}) // Made by ShadowLegacy557
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:tell_pdata')
        .addProperty('data', 'string', 'dataKey', 'the persistent data to tell the player')
        .addProperty('boolean', 'boolean', false, 'whether the data is a boolean or not')
        .addProperty('message', 'string', 'Your persistent data is: ', 'the message to prefix the data with')
        .tick((entity, entry, holder, enabled) => {
            let data = entry.getPropertyByName('data')
            let isBoolean = entry.getPropertyByName('boolean')
            let message = entry.getPropertyByName('message')
            let val
            if (enabled) {
                if (isBoolean == true) {
                    val = entity.persistentData.getBoolean(data).toString()
                } else {
                    val = entity.persistentData.get(data)
                }
                entity.setStatusMessage(message + val)
            }
        })
}) // Made by ShadowLegacy557