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