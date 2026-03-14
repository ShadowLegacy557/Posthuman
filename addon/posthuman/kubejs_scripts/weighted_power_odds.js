let namespace = 'posthuman'

let tier1 = []
let tier2 = []
let tier3 = []

let tier1Chance = Math.floor(1 * tier1.length) // the chance to roll a power from tier 1.
let tier2Chance = Math.floor((4 * tier1.length) + tier1Chance) // the chance to roll a power from tier 2.
let tier3Chance = Math.floor((5 * tier1.length) + tier2Chance) // the chance to roll a power from tier 3.

StartupEvents.registry('palladium:abilities', event => {
    event.create(`${namespace}:weighted_power_rng`)
        .tick((entity, entry, holder, enabled) => {
            if (enabled && !entity.persistentData.getBoolean("power_rolled")) {
                let random = Math.floor(Math.random() * 100) + 1 // generates a random number between 0 and 1000
                let power
                if (random <= tier1Chance) {
                    power = tier1[Math.floor(Math.random() * tier1.length)]
                }
                if (tier1Chance < random <= tier2Chance) {
                    power = tier2[Math.floor(Math.random() * tier2.length)]
                }
                if (tier2Chance < random <= tier3Chance) {
                    power = tier3[Math.floor(Math.random() * tier3.length)]
                } palladium.setProperty(entity, `${namespace}.rolledPower`, power)
                entity.persistentData.putBoolean("power_rolled", true)
            }
        })
})
StartupEvents.registry('palladium:abilities', event => {
    event.create('posthuman:remove_pdata')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.persistentData.getBoolean("power_rolled") === true) {
                entity.persistentData.putBoolean("power_rolled", false)
                palladium.superpowers.removeSuperpower(entity, `${namespace}:chance_granter`)
                palladium.superpowers.addSuperpower(entity, namespace + palladium.getProperty(entity, `${namespace}.rolledPower`))
            }
        })
}) // made by ShadowLegacy557