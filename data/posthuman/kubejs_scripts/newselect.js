const namespace = 'posthuman'
const powerStealerName = 'collection'

PlayerEvents.tick((event) => {
    let player = event.entity
    if (palladium.superpowers.hasSuperpower(player, `${namespace}:${powerStealerName}`)) {
        let ogPower = `${namespace}:` + palladium.getProperty(player, `${namespace}.pSlot0`)
        let power1 = `${namespace}:` + palladium.getProperty(player, `${namespace}.pSlot1`)
        let power2 = `${namespace}:` + palladium.getProperty(player, `${namespace}.pSlot2`)
        let power3 = `${namespace}:` + palladium.getProperty(player, `${namespace}.pSlot3`)
        let allSlotPower = [
            ogPower,
            power1,
            power2,
            power3
        ]
        let current = palladium.getProperty(player, `${namespace}.currentPower`)
        let aimPower = `${namespace}:` + palladium.getProperty(player, `${namespace}.pSlot` + current.toString())
        let otherPowers = allSlotPower.filter((p) => {
            return p !== aimPower
        })
        if (current !== 0) {
            otherPowers.forEach(power => {
                if (palladium.superpowers.hasSuperpower(player, power)) {
                    palladium.superpowers.removeSuperpower(player, power)
                }
                if (!palladium.superpowers.hasSuperpower(player, aimPower)) {
                    palladium.superpowers.addSuperpower(player, aimPower)
                }
            })
        }
        if (current === 0) {
            otherPowers.filter(!ogPower).forEach(power => {
                if (palladium.superpowers.hasSuperpower(player, power)) {
                    palladium.superpowers.removeSuperpower(player, power)
                }
                if (palladium.superpowers.hasSuperpower(player, aimPower)) {
                    palladium.superpowers.removeSuperpower(player, aimPower)
                }
            })
        }
    } else if (palladium.superpowers.hasSuperpower(player, `${namespace}:${powerStealerName}_recipient`)) {
        let ogPower = `${namespace}:` + palladium.getProperty(player, `${namespace}.gSlot0`)
        let power1 = `${namespace}:` + palladium.getProperty(player, `${namespace}.gSlot1`)
        let power2 = `${namespace}:` + palladium.getProperty(player, `${namespace}.gSlot2`)
        let power3 = `${namespace}:` + palladium.getProperty(player, `${namespace}.gSlot3`)
        let allSlotPower = [
            ogPower,
            power1,
            power2,
            power3
        ]
        let current = palladium.getProperty(player, `${namespace}.currentPower`)
        let aimPower = `${namespace}:` + palladium.getProperty(player, `${namespace}.gSlot` + current.toString())
        let otherPowers = allSlotPower.filter((p) => {
            return p !== aimPower
        })
        if (current !== 0) {
            otherPowers.forEach(power => {
                if (palladium.superpowers.hasSuperpower(player, power)) {
                    palladium.superpowers.removeSuperpower(player, power)
                }
                if (!palladium.superpowers.hasSuperpower(player, aimPower)) {
                    palladium.superpowers.addSuperpower(player, aimPower)
                }
            })
        }
        if (current === 0) {
            otherPowers.filter(!ogPower).forEach(power => {
                if (palladium.superpowers.hasSuperpower(player, power)) {
                    palladium.superpowers.removeSuperpower(player, power)
                }
                if (palladium.superpowers.hasSuperpower(player, aimPower)) {
                    palladium.superpowers.removeSuperpower(player, aimPower)
                }
                if (!palladium.superpowers.hasSuperpower(player, ogPower)) {
                    palladium.superpowers.addSuperpower(player, ogPower)
                }
            })
        }
        if (power1 === `${namespace}:empty` && power2 === `${namespace}:empty` && power3 === `${namespace}:empty`) {
            palladium.superpowers.removeSuperpower(player, `${namespace}:${powerStealerName}_recipient`)
        }
    }
}) // Made by ShadowLegacy557 (with some consult from Purphect)

PlayerEvents.tick((event) => {
    let player = event.player
    let nbt = player.getMainHandItem().nbt?.Damage ?? 'none found'
})