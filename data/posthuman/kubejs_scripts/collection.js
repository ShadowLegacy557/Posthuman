PlayerEvents.tick((event) => {
    let player = event.entity
    if (palladium.superpowers.hasSuperpower(player, `destiny:meta_manipulation`)) {
        let selector = palladium.getProperty(player, `Destiny.CopySelector`)
        let aimPower = `destiny:${palladium.getProperty(player, `Destiny.CopiedPower${selector}`)}`
        let allPower = palladium.powers.getPowerIdsForNamespace(player, 'destiny').toArray().filter(p => {
            return p !== 'destiny:meta_manipulation'
        })
        let otherPowers = allPower.filter((p) => {
            return p !== aimPower
        })
        if (selector != 0) {
            otherPowers.forEach(power => {
                if (palladium.superpowers.hasSuperpower(player, power)) {
                    palladium.superpowers.removeSuperpower(player, power)
                }
            })
            if (!palladium.superpowers.hasSuperpower(player, aimPower)) {
                palladium.superpowers.addSuperpower(player, aimPower)
            }
        }
        if (selector == 0) {
            otherPowers.forEach(power => {
                if (palladium.superpowers.hasSuperpower(player, power)) {
                    palladium.superpowers.removeSuperpower(player, power)
                }
                if (palladium.superpowers.hasSuperpower(player, aimPower)) {
                    palladium.superpowers.removeSuperpower(player, aimPower)
                }
            })
        }
    }
}) // Made by ShadowLegacy557