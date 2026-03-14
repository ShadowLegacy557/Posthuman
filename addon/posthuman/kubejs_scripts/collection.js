let namespace = 'posthuman'
let powerStealerName = 'collection'

// 'namespace.pSlot' power string storage slot (string)
// 'namespace.gSlot' gifted power string storage slot (string)

StartupEvents.registry('palladium:abilities', (event) => { // Take powers from other entities
    event.create(`${namespace}:power_steal`)
        .addProperty('range', 'integer', 3, 'the range you can steal powers from')
        .addProperty('whitelist', 'string_array', [], 'the powers that can be stolen')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let range = entry.getPropertyByName('range')
                let whitelist = entry.getPropertyByName('whitelist')
                let target = entity.rayTrace(range).entity
                if (target !== null) {
                    let nums = [
                        0, 1, 2, 3
                    ]
                    let sel = palladium.getProperty(entity, `${namespace}.selector`)
                    nums.forEach(num => {
                        let pSlot = `${namespace}.pSlot${num}`
                        if ((palladium.getProperty(entity, `${namespace}.pSlot${num - 1}`) != 'empty' && palladium.getProperty(entity, pSlot) === 'empty' && num - 1 != 0) || (num - 1 == 0 && palladium.getProperty(entity, pSlot) === 'empty')) {
                            whitelist.forEach(power => {
                                let powerprop = power.replace(`${namespace}:`, '')
                                if (palladium.getProperty(target, `${namespace}.pSlot${sel}`) == power) {
                                    palladium.setProperty(entity, pSlot, powerprop)
                                    palladium.setProperty(target, `${namespace}.pSlot${sel}`, 'empty')
                                    if (palladium.superpowers.hasSuperpower(target, power)) {
                                        palladium.superpowers.removeSuperpower(target, power)
                                    } else return
                                } else return
                            })
                        }
                    })
                } else return
            }
        })
})
StartupEvents.registry('palladium:abilities', (event) => { // Grant powers to other entities
    event.create(`${namespace}:power_bestow`)
        .addProperty('range', 'integer', 3, 'the range to bestow a power')
        .addProperty('max', 'integer', 3, 'the max amount of stored powers')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let range = entry.getPropertyByName('range')
                let max = entry.getPropertyByName('max')
                let recipient = entity.rayTrace(range).entity
                if (recipient == null) return
                if (recipient != null) {
                    let num = palladium.getProperty(entity, `${namespace}.currentPower`)
                    let numstring = num.toString()
                    let pSlot = `${namespace}.pSlot` + numstring
                    let gSlot = `${namespace}.gSlot` + numstring
                    let power = `${namespace}:` + palladium.getProperty(entity, pSlot)
                    let powerprop = power.replace(`${namespace}:`, '')
                    let otherPower = `${namespace}:${powerStealerName}_recipient`
                    if (0 < num <= max && palladium.getProperty(entity, pSlot) !== 'empty' && !palladium.superpowers.hasSuperpower(recipient, power)) {
                        palladium.superpowers.addSuperpower(recipient, otherPower)
                        palladium.superpowers.removeSuperpower(entity, power)
                        palladium.setProperty(entity, pSlot, 'empty')
                        palladium.setProperty(recipient, gSlot, powerprop)
                    }
                } else return
            }
        })
})
StartupEvents.registry('palladium:abilities', (event) => { // Reject the power, deleting it from existence
    event.create(`${namespace}:reject_power`)
        .addProperty('number', 'integer', 1, 'the number attached to the slots')
        .firstTick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let num = entry.getPropertyByName('number')
                let power = palladium.getProperty(entity, `${namespace}.gSlot` + num.toString())
                if (power !== 'empty') {
                    palladium.setProperty(entity, `${namespace}.gSlot` + num.toString(), 'empty')
                } else return
            }
        })
})
StartupEvents.registry('palladium:abilities', (event) => {
    event.create(`${namespace}:read_slots`)
        .addProperty('range', 'integer', 3, 'range to read')
        .addProperty('sel_prop', 'string', 'posthuman.selector', 'the selector property/scroll to change slots')
        .addProperty('slot_prop', 'string', 'posthuman.pSlot', 'the property which contains powers/without the number')
        .addProperty('read_prop', 'string', 'posthuman.readPower', 'the property which contains the read power, without taking it/for gui')

        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                let range = entry.getPropertyByName('range')
                let target = entity.rayTrace(range).entity

                let selector = entry.getPropertyByName('sel_prop')
                let num = palladium.getProperty(entity, selector)

                let slotProp = entry.getPropertyByName('slot_prop')
                let power = palladium.getProperty(target, slotProp + num.toString())
                let readProp = entry.getPropertyByName('read_prop')
                if (target != null && power != 'empty') {
                    palladium.setProperty(entity, readProp, power)
                }
                entity.setStatusMessage(palladium.getProperty(entity, readProp))
            }
        })
})
// Made by ShadowLegacy557
// Thankyou to Purphect for helping with testing and ideas for how to get the scripts to work